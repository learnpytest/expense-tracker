const ApiErrors = require('./apiErrors')

function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiErrors) return res.status(err.code).jsonp({ status: err.code, msg: err.msg })
  return res.status(500).jsonp({ status: 500, msg: 'Something went wrong' })
}

module.exports = apiErrorHandler