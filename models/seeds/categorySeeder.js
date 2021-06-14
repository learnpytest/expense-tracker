const Category = require('../Category')
const db = require('../../config/mongoose')
const { category } = require('../../expense.json').results

db.once('open', () => {
  Category.insertMany(category, (err) => {
    if (err) return console.log(err, 'category seeder is not working')
    console.log('category seeder done')
    db.close()
    return console.log('mongodb disconnected')
  })
})
