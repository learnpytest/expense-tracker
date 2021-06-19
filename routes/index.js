const express = require('express')
const router = express.Router()

const login = require('./modules/login')
const home = require('./modules/home')
const admin = require('./modules/admin')
const records = require('./modules/records')
const users = require('./modules/users')

const ApiErrors = require('../tools/apiErrors')

const { loginCheckerRedirectLogin, loginCheckerRedirectHome, userAuthChecker, adminAuthChecker } = require('../tools/utils')

// router.use((req, res, next) => {
//   const url = req.headers.referer
//   if (url !== undefined) res.locals.url = url
//   next()
// })

router.use((req, res, next) => {
  if (req.session.user && req.cookies) {
    res.locals.firstName = req.session.user.firstName
  }
  next()
})

router.use('/login', loginCheckerRedirectHome, login)
router.use('/logout', loginCheckerRedirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    }
    res.clearCookie()
    return res.redirect('/login')
  })
})
router.use('/admin', loginCheckerRedirectLogin, adminAuthChecker(), admin)
router.use('/records', loginCheckerRedirectLogin, records)
router.use('/', loginCheckerRedirectLogin, userAuthChecker(), home)

router.use((req, res, next) => {
  next(new ApiErrors().incomingRequest('Page Not Found'))
})

module.exports = router