const { validationResult } = require('express-validator')
const Category = require('../models/Category')

const inputNameValid = async (req, res, next) => {
  const { method, path } = req
  const categoryArr = await Category.find().lean()
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    const record = req.body
    const alertMessage = errors.array()
    record._id = req.params.id
    record.isPublic = record.isPublic === 'on'
    if (method === 'PUT' && path === `/${req.params.id}`) {
      return res.render('edit', { record, alertMessage, categoryArr, item: record.category });
    } else if (method === 'POST' && path === `/`) {
      return res.render('new', { record, alertMessage, categoryArr, item: record.category });
    }
  }
}
module.exports = { inputNameValid }