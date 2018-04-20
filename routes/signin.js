'use strict'
const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const isAuthenticated = require('../authentication/middleware')

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.render('signin')
  })
  
  router.post('/', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }))

  return router
}