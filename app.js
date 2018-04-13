'use strict'
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

// Routes import
const routes = require('./routes')

// App init
const app = express()
const httpApp = express()

// Global variables and constants
const port = process.env.PORT || 3000
const options = {
  key: fs.readFileSync(path.join(__dirname, 'keys/devkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'keys/devcert.crt'))
}

// Redirect to https URLs
httpApp
  .get('*', (req, res) => {
    res.redirect(`https://${req.hostname}:${port}${req.url}`)
  })
  .listen(80)

// Template engine sets
app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'))

// Set static folder
  .use(express.static(path.join(__dirname, 'public')))

// Parsers
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cookieParser())

// Validation
  .use(validator({
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
  .use(flash())

// Helmet
  .use(helmet())

// Request log
  .use((req, res, next) => {
    let date = new Date().toISOString()
  
    console.log(`${date} ${req.protocol} ${req.method} request to ${req.url} by ${req.ip}`)
    next()
  })

// Session
  .use(session({
    secret: 'secret',
    saveUninitialized: false,
    resave: false
  }))

// Passport
  .use(passport.initialize())
  .use(passport.session())

// Routes
  .use(routes)

// Server creation
spdy
  .createServer(options, app)
  .listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })