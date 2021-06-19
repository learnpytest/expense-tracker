const Record = require('../models/Record')
const scopedRecords = async function (req, res, next) {
  try {
    const recordsArr = await Record.find().lean()
    req.recordsArrAllowed = await recordsArr.filter(ele => {
      return ele.isPublic === true || ele.owner === req.session.user.email || ele.group.find(item => item === req.session.user.email)
    })
    next()
  } catch (err) {
    return next(err)
  }
}

module.exports = { scopedRecords }