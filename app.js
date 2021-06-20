const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const helpers = require('handlebars-helpers')()
const moment = require('moment')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const routes = require('./routes')
require('./config/mongoose')

const apiErrorHandler = require('./tools/apiErrorHandler')
const ApiErrors = require('./tools/apiErrors')

const app = express()
const PORT = process.env.PORT || 3000

const SSESSION_ID = 'sid'

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    getRecords: function (id, userOwnedRecord) {
      return userOwnedRecord[`${id}`]
    },
    getCount: function (id, userOwnedRecord) {
      return userOwnedRecord[`${id}`].length
    },
    addAmount: function (simpleArr) {
      let amount = 0
      simpleArr.forEach(element => {
        amount += element.amount
      });
      return amount
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

app.use(session({ key: SSESSION_ID, secret: 'my secret food', resave: false, saveUninitialized: false, cookie: { expires: 1000000 } }))
app.use(cookieParser())

app.use(routes)

app.use(apiErrorHandler)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})