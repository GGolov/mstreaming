'use strict'
const router = require('express').Router()
const isAdmin = require('../authentication/is-admin')

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      res.render('admin-panel')
    })

  return router
}