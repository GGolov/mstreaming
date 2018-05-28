'use strict'
const router = require('express').Router()

const users = require('./users')

module.exports = (passport) => {
  router
    .use('/users', users(passport))

  return router
}