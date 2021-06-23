const { body, validationResult } = require('express-validator')
const Category = require('../models/Category')

const inputValidationRules = () => {
  return [
    body('name', 'Enter at least a word').trim().exists().isLength({ min: 1 }), body('date', 'Not valid format').exists().isDate({ format: "YYYY/MM/DD" }),
    body('amount', 'Enter 0 or positive integer').exists().isNumeric().matches(/^([1-9]\d*)|0$/)
    //     //For edit form input, for amount, Only integer input and >= 0, exclude exception of starting by 0 such as 01
  ]
}

const inputValidate = async (req, res, next) => {
  const { method, path } = req
  const categoryArr = await Category.find().lean()
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    const record = req.body
    const alertMessage = errors.array()
    record._id = req.params.id
    record.isCollab = record.isCollab === 'on'
    if (method === 'PUT' && path === `/${req.params.id}`) {
      return res.render('edit', { record, alertMessage, categoryArr, item: record.category });
    } else if (method === 'POST' && path === `/`) {
      return res.render('new', { record, alertMessage, categoryArr, item: record.category });
    }
  }
}

module.exports = { inputValidationRules, inputValidate }