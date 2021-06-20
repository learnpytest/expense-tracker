const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const { scopedRecords } = require('../../tools/permission')
const Record = require('../../models/Record')

//這裡是使用者管理相關的元件
router.get('/users', async (req, res) => {
  const usersArr = await User.find().lean()
  const userOwnedRecord = {}
  for (user of usersArr) {
    userOwnedRecord[user._id] = await Record.find({ owner: user.email }).lean()
  }
  return res.render('user', { usersArr, userNumber: usersArr.length, userOwnedRecord, layout: 'adminPortal' })
})
//這裡是使用者管理相關的元件

//這裡是管理者可以看到所有使用者全部的支出清單
router.get('/', scopedRecords, async (req, res) => {
  return res.render('index', { recordsArr: req.recordsArrAllowed, categoryArr: req.categoryArr, layout: 'adminPortal' })
})
//這裡是管理者可以看到所有使用者全部的支出清單

module.exports = router