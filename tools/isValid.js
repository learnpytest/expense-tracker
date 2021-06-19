const { validationResult } = require('express-validator')
const Category = require('../models/Category')

const inputNameValid = async (req, res, next) => {
  const categoryArr = await Category.find().lean()
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    const record = req.body
    const { isPublic } = req.body
    const alertMessage = errors.array()
    record._id = req.params.id
    record.isPublic = isPublic === 'on'
    return res.render('edit', { record, alertMessage, categoryArr, item: record.category })
  }
}
module.exports = { inputNameValid }