'use strict'
const router = require('express').Router()

const users = require('./admin/users')
const songs = require('./admin/songs')

module.exports = (passport) => {
  router
    .use('/users', users(passport))
    .use('/songs', songs(passport))

  return router
}