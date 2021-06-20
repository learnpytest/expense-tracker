const express = require('express')
const router = express.Router()

const login = require('./modules/login')
const logout = require('./modules/logout')
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

//user only can logout when they are already logged in
router.use('/logout', loginCheckerRedirectLogin, logout)

//check is logged in user -> yes -> is admin role -> yes -> go to admin portal
router.use('/admin', loginCheckerRedirectLogin, adminAuthChecker(), admin)
router.use('/records', loginCheckerRedirectLogin, records)

//check is logged in user -> yes -> is user role -> yes -> go to user dashboard
router.use('/', loginCheckerRedirectLogin, userAuthChecker(), dashboard)

router.use((req, res, next) => {
  next(new ApiErrors().incomingRequest('Page Not Found'))
})

module.exports = router