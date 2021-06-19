const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const User = require('../../models/User')

router.get('/', async (req, res) => {
  const usersArr = await User.find().lean()
  // const categoryArr = await Category.find().lean()

  return res.render('user', { usersArr })
})

module.exports = router