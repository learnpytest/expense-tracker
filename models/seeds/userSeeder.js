const User = require('../User')
const db = require('../../config/mongoose')
const { user } = require('../../expense.json').results

db.once('open', () => {
  User.insertMany(user, (err) => {
    if (err) return console.log(err, 'user seeder is not working')
    console.log('user seeder done')
    db.close()
    return console.log('mongodb disconnected')
  })
})
