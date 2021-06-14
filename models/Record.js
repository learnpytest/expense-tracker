const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
    required: [true, "Date is required"]
  },
  amount: {
    type: Number,
    require: [true, "Amount is required"],
    min: [0, "Negative number is not accepted"]
  },
  footnote: {
    type: String
  },
  ownerID: {
    type: String
  },
  isPublic: {
    type: Boolean,
    //tobe modified after user account is set
    default: true
  }
})

module.exports = mongoose.model('Record', recordSchema)