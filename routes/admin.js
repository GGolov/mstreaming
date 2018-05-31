'use strict'
const router = require('express').Router()

const users = require('./admin/users')
const albums = require('./admin/albums')
const artists = require('./admin/artists')

module.exports = (passport) => {
  router
    .use('/users', users(passport))
    .use('/albums', albums(passport))
    .use('/artists', artists(passport))

  return router
}