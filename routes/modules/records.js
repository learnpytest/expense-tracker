const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')
const Category = require('../../models/Category')

const ApiErrors = require('../../tools/apiErrors')

//驗證
const { check, validationResult } = require('express-validator')
const { inputNameValid } = require('../../tools/isValid')
//驗證

//權限
const { scopedRecords } = require('../../tools/permission')
//權限

//區分admin與user可取得的資料範圍，再從資料範圍篩選類別
router.get('/category', scopedRecords, async (req, res, next) => {
  const { category } = req.query
  try {
    const isExistsCategory = await Category.findOne({ id: category })
    if (!isExistsCategory) return next(new ApiErrors().incomingRequest('Page Not Found')) //使用者在這支路由使用不在開放權限內的category 做API請求，回應404 Page Not Found

    const filteredByCategory = req.recordsArrAllowed.filter(item => item.category === category)
    let errorMessage = ''
    if (!filteredByCategory.length) {
      errorMessage = `<div class="alert alert-primary" role="alert">沒有相關支出!</div>`
    }
    return res.render('index', { recordsArr: filteredByCategory, categoryArr: req.categoryArr, errorMessage, item: category })
  } catch (err) {
    console.log(err)
    return next(new ApiErrors().internalHandling('Failed filtering'))
  }
})
//區分admin與user可取得的資料範圍，再從資料範圍篩選類別

//導向新增支出頁面
router.get('/new', async (req, res, next) => {
  try {
    const categoryArr = await Category.find().lean()
    return res.render('new', { categoryArr, item: false })
  } catch (err) {
    console.log(err)
    return next(new ApiErrors().incomingRequest('Page Not Found'))
  }
})
//導向新增支出頁面

// 導向編輯頁面
router.get('/:id/edit', async (req, res, next) => {
  const { id } = req.params
  try {
    const record = await Record.findById({ _id: id }).lean()
    const categoryArr = await Category.find().lean()
    const { category } = record
    return res.render('edit', { record, categoryArr, item: category })
  } catch (err) {
    console.log(err)
    return next(new ApiErrors().internalHandling('Failed Editing '))
  }

})

//編輯一筆資料與送出表單
router.put('/:id', [
  check('name', 'Enter at least a word').trim().exists().isLength({ min: 1 }), check('date', 'Not valid format').exists().isDate({ format: "YYYY/MM/DD" }),
  check('amount', 'Enter 0 or positive integer').exists().isNumeric().matches(/^([1-9]\d*)|0$/)
  //For edit form input, for amount, Only integer input and >= 0, exclude exception of starting by 0 such as 01
], inputNameValid, async (req, res) => {
  const { id } = req.params
  const { isCollab } = req.body
  req.body.isCollab = isCollab === 'on'
  try {
    await Record.findOneAndUpdate({ "_id": id }, { $set: req.body })
    return res.redirect('/')
  } catch (err) {
    return next(new ApiErrors().internalHandling('Failed updating database')) //錯誤處理
  }
})
//編輯一筆資料與送出表單

//新增一筆支出與送出表單
router.post('/', [
  check('name', 'Enter at least a word').trim().exists().isLength({ min: 1 }), check('date', 'Not valid format').exists().isDate({ format: "YYYY/MM/DD" }),
  check('amount', 'Enter 0 or positive integer').exists().isNumeric().matches(/^([1-9]\d*)|0$/)
  //For edit form input, for amount, Only integer input and >= 0, exclude exception of starting by 0 such as 01
], inputNameValid, async (req, res, next) => {
  const newDate = req.body
  newDate.owner = req.session.user.email
  newDate.isCollab = req.body.isCollab === 'on'
  try {
    await Record.create(newDate)
    return res.redirect('/')
  } catch (err) {
    console.log(err)
    return next(new ApiErrors().internalHandling('Failed updating database'))
  }
})
//新增一筆支出與送出表單

//刪除一筆支出
router.delete('/:id', async (req, res, err) => {
  const { id } = req.params
  try {
    await Record.findOneAndDelete({ "_id": id })
    return res.redirect('/')
  } catch (err) {
    next(new ApiErrors().internalHandling('Failed deleting doc from database'))
  }
})
//刪除一筆支出

router.get('/', (req, res) => {
  return res.redirect('/dashboard')
})

module.exports = router