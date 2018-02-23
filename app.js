const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')
const session = require('express-session')
const validator = require('express-validator')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const express = require('express')
const spdy = require('spdy')

// Custom modules
const requestLog = require('./modules/request-log')

// Routes import
const routes = require('./routes/routes')

// App init
const app = express()

// Global variables and constants
const port = process.env.PORT || 3000
const options = {
  key: fs.readFileSync(path.join(__dirname, 'keys/devkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'keys/devcert.crt'))
}

// Template engine sets
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Parsers
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// Validation
app.use(validator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
    let root = namespace.shift()
    let formParam = root

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }

    return {
      param: formParam,
      msg: msg,
      value: value
    }
  }
}))

// Connect flash
app.use(flash())

// Helmet
app.use(helmet())

// Request log
app.use(requestLog)

// Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use(routes)

spdy.createServer(options, app).listen(port, () => {
  console.log(`Server listening on port ${port}`)
})