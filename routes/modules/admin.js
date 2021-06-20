const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { scopedRecords } = require('../../tools/permission')
const Record = require('../../models/Record')

//this is user management web apps
router.get('/users', async (req, res) => {
  const usersArr = await User.find().lean()
  const userOwnedRecord = {}
  for (user of usersArr) {
    userOwnedRecord[user._id] = await Record.find({ owner: user.email }).lean()
  }
  return res.render('user', { usersArr, userNumber: usersArr.length, userOwnedRecord, layout: 'adminPortal' })
})
//this is user management web apps

//admin can check all expense records so get all information from database
router.get('/', scopedRecords, async (req, res) => {
  return res.render('index', { recordsArr: req.recordsArrAllowed, categoryArr: req.categoryArr, layout: 'adminPortal' })
})

module.exports = router