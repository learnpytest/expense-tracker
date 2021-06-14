const express = require('express')
const router = express.Router()

const Record = require('../../models/Record')


router.get('/new', (req, res) => {
  return res.render('new')
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

//新增一筆支出
router.post('/', async (req, res) => {
  const newDate = req.body
  await Record.create(newDate)
  return res.redirect('/')
})
//新增一筆支出

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  await Record.findOneAndDelete({ "_id": id })
  return res.redirect('/')
})



module.exports = router