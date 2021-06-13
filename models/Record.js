const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    require: true
  }
})

module.exports = mongoose.model('Record', recordSchema)