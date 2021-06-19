function ApiErrors(code, msg) {
  this.code = code
  this.msg = msg
}

ApiErrors.prototype.incomingRequest = function (msg) {
  return new ApiErrors(404, msg)
}

ApiErrors.prototype.internalHandling = function (msg) {
  return new ApiErrors(500, msg)
}

module.exports = ApiErrors