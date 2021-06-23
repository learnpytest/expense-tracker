const User = require('../User')
const db = require('../../config/mongoose')
const { user } = require('../../expense.json').results
const bcrypt = require('bcryptjs')

// use bcrypt hash password for users
db.once('open', async () => {
  for (char of user) {
    char.password = await bcrypt.genSalt(10).then(salt => bcrypt.hash(char.password, salt))
  }
  User.insertMany(user, (err) => {
    if (err) return console.log(err, 'user seeder is not working')
    console.log('user seeder done')
    db.close()
    return console.log('mongodb disconnected')
  })
})
