const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')

const getCategoryElement = async function (categoryID) {
  const category = await Category.find({ id: categoryID }).lean()
  return category[0].imageElement
}
router.get('/', async (req, res) => {
  const recordsArr = await Record.find().lean()
  const categoryArr = await Category.find().lean()
  // return console.log(categoryArr)
  return res.render('index', { recordsArr, categoryArr })
})

module.exports = router