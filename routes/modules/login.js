const express = require('express')
const bcrypt = require('bcryptjs')

const router = express.Router()

const User = require('../../models/User')

router.get('/', (req, res) => {
  res.render('login')
})

router.post('/', async (req, res) => {
  const { email, password } = req.body
  const isExists = await User.findOne({ email }).lean()
  const wrongAccountError = `Wrong email account or password!`
  if ((!isExists)) {
    return res.render('login', { wrongAccountError })
  }
  //compare bcrypted password
  const isMatch = await bcrypt.compare(password, isExists.password)
  if ((!isMatch)) {
    return res.render('login', { wrongAccountError })
  }
  req.session.user = isExists

  return res.redirect('/')
})

module.exports = router