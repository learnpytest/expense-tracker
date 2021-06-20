const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { scopedRecords } = require('../../tools/permission')
const Record = require('../../models/Record')

router.get('/users', async (req, res) => {
  const usersArr = await User.find().lean()
  const counts = {}
  const userOwnedRecord = {}
  for (user of usersArr) {
    // counts[user.email] = await Record.find({ owner: user.email }).countDocuments()
    userOwnedRecord[user._id] = await Record.find({ owner: user.email }).lean()

  }
  // return console.log(userOwnedRecord['captain@hotmail.com'].length)
  return res.render('user', { usersArr, userNumber: usersArr.length, userOwnedRecord })
})


router.get('/', scopedRecords, async (req, res) => {
  return res.render('index', { recordsArr: req.recordsArrAllowed, categoryArr: req.categoryArr, layout: 'adminPortal' })
})

module.exports = router