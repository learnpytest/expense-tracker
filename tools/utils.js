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

module.exports = { loginCheckerRedirectLogin, loginCheckerRedirectHome }