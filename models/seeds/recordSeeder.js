const Record = require('../Record')
const db = require('../../config/mongoose')
const { record } = require('../../expense.json').results

db.once('open', () => {
  Record.insertMany(record, (err) => {
    if (err) return console.log(err, 'record seeder is not working')
    console.log('record seeder done')
    db.close()
    return console.log('mongodb disconnected')
  })
})