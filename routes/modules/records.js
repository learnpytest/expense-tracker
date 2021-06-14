const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')


router.get('/new', (req, res) => {
  return res.send('This is records page')
})

router.get('/:id/edit', async (req, res) => {
  const { id } = req.params
  const record = await Record.findById({ _id: id }).lean()
  return res.render('edit', { record })
})

router.put('/:id', (req, res) => {

})
router.post('/', (req, res) => {

})
router.delete('/:id', (req, res) => {

})



module.exports = router