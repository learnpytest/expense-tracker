const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')


router.get('/new', (req, res) => {
  return res.send('This is records page')
})

// 編輯一筆資料
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params
  const record = await Record.findById({ _id: id }).lean()
  return res.render('edit', { record })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  await Record.findOneAndUpdate({ "_id": id }, { $set: req.body })
  return res.redirect('/')
})

// 編輯一筆資料

router.post('/', (req, res) => {

})
router.delete('/:id', (req, res) => {

})



module.exports = router