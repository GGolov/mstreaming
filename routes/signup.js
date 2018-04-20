'use strict'
const router = require('express').Router()
const User = require('../models/user')
const isAuthenticated = require('../authentication/middleware')

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.render('signup')
  })
  
  router.post('/', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  return router
}