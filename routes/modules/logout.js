
const express = require('express')
const router = express.Router()

const SSESSION_ID = 'sid'

router.get('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err)
      return next(new ApiErrors().incomingRequest('Failed Logout'))
    }
    res.clearCookie(SSESSION_ID)
    return res.redirect('/login')
  })
})
module.exports = router