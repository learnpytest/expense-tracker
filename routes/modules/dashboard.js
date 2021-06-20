const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

//權限
const { scopedRecords } = require('../../tools/permission')
//權限

router.get('/', async (req, res) => {
  res.redirect('/dashboard')
})

router.get('/dashboard', scopedRecords, async (req, res, next) => {
  try {
    return res.render('index', { recordsArr: req.recordsArrAllowed, categoryArr: req.categoryArr, layout: 'userDashboard' })
  } catch (err) {
    return next(err)
  }
})

module.exports = router