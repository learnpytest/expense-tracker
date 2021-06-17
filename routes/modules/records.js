const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

//驗證
const { check, validationResult } = require('express-validator')
const { inputNameValid } = require('../../tools/isValid')
//驗證

//篩選類別
router.get('/category', async (req, res) => {
  const { category } = req.query
  const filteredByCategory = await Record.find({ category }).lean()
  const categoryArr = await Category.find().lean()

  let errorMessage = ''
  if (!filteredByCategory.length) {
    errorMessage = `<div class="alert alert-primary" role="alert">沒有相關支出!</div>`
  }
  return res.render('index', { recordsArr: filteredByCategory, categoryArr, errorMessage, item: category })
})
//篩選類別

router.get('/new', async (req, res) => {
  const categoryArr = await Category.find().lean()
  return res.render('new', { categoryArr, item: false })
})

// 編輯一筆資料
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params
  const record = await Record.findById({ _id: id }).lean()
  const category = record.category
  const categoryArr = await Category.find().lean()
  return res.render('edit', { record, categoryArr, item: category })
})

router.put('/:id', [
  check('name', 'Please enter at least a word for name').trim().exists().isLength({ min: 1 }), check('date', 'Not valid date format').exists().isDate({ format: "YYYY/MM/DD" }),
  check('amount', 'The amount has to be 0 or positive integer').exists().isInt({ min: 0 }).isNumeric().matches(/^[1-9]\d*|^0$/)
  //For edit form input, for amount, Only integer input and >= 0, exclude exception of starting by 0 such as 01
], inputNameValid, async (req, res) => {
  const { id } = req.params
  const { isPublic } = req.body
  // return console.log(req.body)
  req.body.isPublic = isPublic === 'on'
  await Record.findOneAndUpdate({ "_id": id }, { $set: req.body })
  return res.redirect('/')
})
// 編輯一筆資料

//新增一筆支出
router.post('/', async (req, res) => {
  const newDate = req.body
  await Record.create(newDate)
  return res.redirect('/')
})
//新增一筆支出

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Record.findOneAndDelete({ "_id": id })
  return res.redirect('/')
})

module.exports = router