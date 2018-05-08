'use strict'
const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const isAuthenticated = require('../authentication/middleware')

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.render('signin')
  })
  
  router.post('/', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  }))

  return router
}