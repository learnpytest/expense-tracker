const express = require('express')
const router = express.Router()

const login = require('./modules/login')
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const ApiErrors = require('../tools/apiErrors')
const ROLE = {
  user: "user",
  admin: "admin"
}

const { loginCheckerRedirectLogin, loginCheckerRedirectHome, roleChecker } = require('../tools/utils')

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
router.use('/users', users)
router.use('/admin', loginCheckerRedirectLogin, roleChecker(ROLE.admin), admin)

router.use((req, res, next) => {
  next(new ApiErrors().incomingRequest('Page Not Found'))
})

module.exports = router