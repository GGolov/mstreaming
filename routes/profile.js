'use strict'
const router = require('express').Router()
const isAuthenticated = require('../authentication/middleware')

module.exports = (passport) => {
  router.get('/', isAuthenticated, (req, res) => {
    res.render('profile', { email: req.user.email })
  })
}