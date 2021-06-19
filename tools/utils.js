const ApiErrors = require('../tools/apiErrors')

function roleChecker(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.redirect('/home')
      return next(new ApiErrors().incomingUserRequest('Permission denied'))
    }
    next()
  }
}

const loginCheckerRedirectLogin = (req, res, next) => {
  if (req.session.user && req.cookies) {
    res.locals.firstName = req.session.user.firstName
    next()
  } else {
    res.redirect('/login')
  }
}

const loginCheckerRedirectHome = (req, res, next) => {
  if (req.session.user && req.cookies) {
    res.locals.firstName = req.session.user.firstName
    return res.redirect('/home')
  } else {
    next()
  }
}


module.exports = { loginCheckerRedirectLogin, loginCheckerRedirectHome, roleChecker }