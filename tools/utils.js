const ApiErrors = require('../tools/apiErrors')

function roleAuthChecker(role) {
  return (req, res, next) => {
    if (req.session.user.role !== role) {
      res.redirect('/home')
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


module.exports = { loginCheckerRedirectLogin, loginCheckerRedirectHome, roleAuthChecker }