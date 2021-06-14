const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  return res.send('This is records page')
})

module.exports = router