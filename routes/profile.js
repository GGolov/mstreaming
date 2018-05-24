'use strict'
const router = require('express').Router()
const isAuthenticated = require('../authentication/is-authenticated')

module.exports = (passport) => {
  router.get('/', isAuthenticated, (req, res) => {
    res.render('profile')
  })

  return router
}