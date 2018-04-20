'use strict'
const router = require('express').Router()

const home = require('./routes/home')
const signin = require('./routes/signin')
const signup = require('./routes/signup')
const profile = require('./routes/profile')

module.exports = (passport) => {
  router
    .use('/', home(passport))
    .use('/signin', signin(passport))
    .use('/signup', signup(passport))
    .use('/profile', signup(passport))

  return router
}