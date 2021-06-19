const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

const ApiErrors = require('../../tools/apiErrors')

//驗證
const { check, validationResult } = require('express-validator')
const { inputNameValid } = require('../../tools/isValid')
//驗證

//篩選類別
router.get('/category', async (req, res, next) => {
  const { category } = req.query
  try {
    const isExistsCategory = await Category.findOne({ id: category })
    if (!isExistsCategory) return next(new ApiErrors().incomingRequest('Page Not Found')) //使用者在這支路由使用不在開放權限內的category 做API請求，回應404 Page Not Found

    const filteredByCategory = await Record.find({ category }).lean()
    const categoryArr = await Category.find().lean()
    let errorMessage = ''
    if (!filteredByCategory.length) {
      errorMessage = `<div class="alert alert-primary" role="alert">沒有相關支出!</div>`
    }
    return res.render('index', { recordsArr: filteredByCategory, categoryArr, errorMessage, item: category })
  } catch (err) {
    return next(err)
  }
})
//篩選類別

router.get('/new', async (req, res, next) => {
  try {
    const categoryArr = await Category.find().lean()
    return res.render('new', { categoryArr, item: false })
  } catch (err) {
    return next(err)
  }
})

// 編輯一筆資料
router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params
  try {
    const record = await Record.findById({ _id: id }).lean()
    const category = record.category
    const categoryArr = await Category.find().lean()
    return res.render('edit', { record, categoryArr, item: category })
  } catch (err) {
    return next(new ApiErrors().incomingRequest('Page Not Found')) //錯誤處理，回應404 Page Not Found
  }
})

router.put('/:id', [
  check('name', 'Please enter at least a word for name').trim().exists().isLength({ min: 1 }), check('date', 'Not valid date format').exists().isDate({ format: "YYYY/MM/DD" }),
  check('amount', 'The amount has to be 0 or positive integer').exists().isNumeric().matches(/^([1-9]\d*)|0$/)
  //For edit form input, for amount, Only integer input and >= 0, exclude exception of starting by 0 such as 01
], inputNameValid, async (req, res) => {
  const { id } = req.params
  const { isPublic } = req.body
  req.body.isPublic = isPublic === 'on'
  try {
    await Record.findOneAndUpdate({ "_id": id }, { $set: req.body })
    return res.redirect('/')
  } catch (err) {
    return next(err) //錯誤處理
  }
})
// 編輯一筆資料

//新增一筆支出
router.post('/', async (req, res, next) => {
  const newDate = req.body
  const { isPublic } = req.body
  req.body.isPublic = isPublic === 'on'
  try {
    await Record.create(newDate)
    return res.redirect('/')
  } catch (err) {
    return next(err)
  }
})
//新增一筆支出

//刪除一筆支出
router.delete('/:id', async (req, res, err) => {
  const { id } = req.params
  try {
    await Record.findOneAndDelete({ "_id": id })
    return res.redirect('/')
  } catch (err) {
    next(err)
  }
})
//刪除一筆支出

module.exports = router