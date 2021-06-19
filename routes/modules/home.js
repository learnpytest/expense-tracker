const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

//權限
const { scopedRecords } = require('../../tools/permission')
//權限

const getCategoryElement = async function (categoryID) {
  const category = await Category.find({ id: categoryID }).lean()
  return category[0].imageElement
}
router.get('/', async (req, res) => {
  res.redirect('/dashboard')
})

router.get('/dashboard', scopedRecords, async (req, res, next) => {
  try {
    const categoryArr = await Category.find().lean()
    return res.render('index', { recordsArr: req.recordsArrAllowed, categoryArr })
  } catch (err) {
    return next(err)
  }
})

module.exports = router