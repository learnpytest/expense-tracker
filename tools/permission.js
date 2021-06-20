const Record = require('../models/Record')
const ApiErrors = require('../tools/apiErrors')
const Category = require('../models/Category')

const getCategoryElement = async function (categoryID) {
  const category = await Category.find({ id: categoryID }).lean()
  return category[0].imageElement
}

const admin = async (req, res) => {
  try {
    req.categoryArr = await Category.find().lean()
    req.recordsArrAllowed = await Record.find().lean()
  } catch (err) {
    return next(new ApiErrors().incomingRequest('Not Allowed'))
  }
}

const userOwnOverview = async (req, res) => {
  try {
    req.categoryArr = await Category.find().lean()
    req.recordsArrAllowed = await Record.find({ owner: req.session.user.email }).lean()
  } catch (err) {
    return next(new ApiErrors().incomingUserRequest('Not Allowed'))
  }
}

const scopedRecords = async (req, res, next) => {
  if (req.session.user.role === 'admin') {
    await admin(req, res)
  } else if (req.session.user.role === 'user') {
    await userOwnOverview(req, res)
  }
  next()
}

module.exports = { scopedRecords, getCategoryElement }