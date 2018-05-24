'use strict'
const router = require('express').Router()
const isAuthenticared = require('../authentication/is-authenticated')

module.exports = (passport) => {
  router
    .get('/', isAuthenticared, (req, res) => {
      res.render('explore')
    })

  return router
}