const express = require('express')
const router = express.Router()

const login = require('./modules/login')
const home = require('./modules/home')
const records = require('./modules/records')

const { loginCheckerRedirectLogin, loginCheckerRedirectHome } = require('../tools/utils')

// const users = require('./modules/users')

// router.use('/users', users)
router.use((req, res, next) => {
  const url = req.headers.referer
  if (url !== undefined) res.locals.url = url
  next()
})
router.use('/login', loginCheckerRedirectHome, login)
router.use('/logout', (req, res) => {

})
router.use('/', loginCheckerRedirectLogin, home)
router.use('/records', records)

module.exports = router