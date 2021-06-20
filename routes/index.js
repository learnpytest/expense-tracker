const express = require('express')
const router = express.Router()

const login = require('./modules/login')
const dashboard = require('./modules/dashboard')
const admin = require('./modules/admin')
const records = require('./modules/records')

const ApiErrors = require('../tools/apiErrors')

const { loginCheckerRedirectLogin, loginCheckerRedirectDashboard, userAuthChecker, adminAuthChecker } = require('../tools/auth')

router.use((req, res, next) => {
  if (req.session.user && req.cookies) {
    res.locals.firstName = req.session.user.firstName
  }
  next()
})

router.use('/login', loginCheckerRedirectDashboard, login)
router.use('/logout', loginCheckerRedirectLogin, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      return next(new ApiErrors().incomingRequest('Failed Logout'))
    }
    res.clearCookie()
    return res.redirect('/login')
  })
})

router.use('/admin', loginCheckerRedirectLogin, adminAuthChecker(), admin)
router.use('/records', loginCheckerRedirectLogin, records)
router.use('/', loginCheckerRedirectLogin, userAuthChecker(), dashboard)

router.use((req, res, next) => {
  next(new ApiErrors().incomingRequest('Page Not Found'))
})

module.exports = router