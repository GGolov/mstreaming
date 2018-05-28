'use strict'
const router = require('express').Router()
const isAdmin = require('../authentication/is-admin')
const User = require('../models/user')

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      User
        .find((err, users) => {
          res.render('admin-panel', { users: users })
        })
    })

  return router
}