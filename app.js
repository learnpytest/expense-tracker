const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')()
const moment = require('moment')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    isCategorySelected: function (item, category) {
      if (item === category) return "selected"
    },
    getCalendarDate: function (date) {
      return moment(date).format("YYYY-MM-DD")
    },
    getCategoryElement: function (categoryArr, id) {
      const ele = categoryArr.find(element => element.id === id)
      return ele.imageElementClass
    }
  }
}))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})