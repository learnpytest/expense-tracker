const mongoose = require('mongoose')

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'
const MONGODB_URI = 'mongodb+srv://root:root@cluster0.jftyp.mongodb.net/expensetracker?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db