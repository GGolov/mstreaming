'use strict'
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const express = require('express')
const spdy = require('spdy')
const mongoose = require('mongoose')
const initPassport = require('./authentication/init')
const dbConfig = require('./dbconfig')

// Routes import
const router = require('./router')

// App init
const app = express()
// const httpApp = express()

// Global variables and constants
const port = process.env.PORT || 3000
const options = {
  key: fs.readFileSync(path.join(__dirname, 'keys/devkey.key')),
  cert: fs.readFileSync(path.join(__dirname, 'keys/devcert.crt'))
}

mongoose.connect(dbConfig.localUrl)

// Redirect to https URLs
// httpApp
//   .get('*', (req, res) => {
//     res.redirect(`https://${req.hostname}:${port}${req.url}`)
//   })
//   .listen(80)

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

// Connect flash
  .use(flash())

// Helmet
  .use(helmet())

// Request log
  .use((req, res, next) => {
    console.log(`${req.protocol} ${req.method} request to ${req.url} by ${req.ip}`)
    next()
  })

// Session
  .use(session({
    secret: 'secretkey',
    saveUninitialized: false,
    resave: false
  }))

// Passport
  .use(passport.initialize())
  .use(passport.session())

// User session persistance in the template engine
  .use((req, res, next) => {
    res.locals.user = req.user
    next()
  })
// Router
  .use(router(passport))

// Error 404
  .use((req, res, next) => {
    res.redirect('/')
  })

// Passport configuration
initPassport(passport)

// Server creation
spdy
  .createServer(options, app)
  .listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })