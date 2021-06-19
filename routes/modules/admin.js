const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const User = require('../../models/User')

const getCategoryElement = async function (categoryID) {
  const category = await Category.find({ id: categoryID }).lean()
  return category[0].imageElement
}

router.get('/users', async (req, res) => {
  const usersArr = await User.find().lean()
  // const categoryArr = await Category.find().lean()

  return res.render('user', { usersArr })
})

router.get('/', async (req, res) => {
  const recordsArr = await Record.find().lean()
  const categoryArr = await Category.find().lean()
  return res.render('admin', { recordsArr, categoryArr })
})

module.exports = router