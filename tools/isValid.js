const { validationResult } = require('express-validator')
const inputNameValid = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    next()
  } else {
    const record = req.body
    const { isPublic } = req.body
    const alertMessage = errors.array()
    record._id = req.params.id
    record.isPublic = isPublic === 'on'
    return res.render('edit', { record, alertMessage })
  }
}
module.exports = { inputNameValid }