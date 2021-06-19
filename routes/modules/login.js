const express = require('express')
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
  const isPasswordMatch = isExists.password === password
  if ((!isPasswordMatch)) {
    return res.render('login', { wrongAccountError })
  }
  req.session.user = isExists

  return res.redirect('/')
})

module.exports = router