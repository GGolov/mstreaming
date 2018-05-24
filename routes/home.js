'use strict'
const router = require('express').Router()
const isAuthenticated = require('../authentication/is-authenticated')

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.render('home')
  })

  return router
}