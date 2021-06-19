const ApiErrors = require('../tools/apiErrors')

function userAuthChecker() {
  return (req, res, next) => {
    if (req.session.user.role === 'user') {
      return next()
    } else if (req.session.user.role === 'admin') {
      return res.redirect('/admin')
    }
    return next(new ApiErrors().incomingUserRequest('Permission denied'))
  }
}

function adminAuthChecker() {
  return (req, res, next) => {
    if (req.session.user.role !== 'admin') {
      return next(new ApiErrors().incomingUserRequest('Permission denied'))
    }
    next()
  }
}

const loginCheckerRedirectLogin = (req, res, next) => {
  if (req.session.user && req.cookies) {
    next()
  } else {
    return res.redirect('/login')
  }
}

const loginCheckerRedirectHome = (req, res, next) => {
  if (req.session.user && req.cookies) {
    return res.redirect('/home')
  } else {
    next()
  }
}

module.exports = { loginCheckerRedirectLogin, loginCheckerRedirectHome, userAuthChecker, adminAuthChecker }