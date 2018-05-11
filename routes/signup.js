'use strict'
const router = require('express').Router()
const User = require('../models/user')
const isAuthenticated = require('../authentication/is-authenticated')
const check = require('express-validator/check').check

/**
 * This regex will enforce these rules:

    At least one upper case English letter, (?=.*?[A-Z])
    At least one lower case English letter, (?=.*?[a-z])
    At least one digit, (?=.*?[0-9])
    At least one special character, (?=.*?[#?!@$%^&*-])
    Minimum eight in length .{8,} (with the anchors)
 */
const passwordRegex = /\d^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).$/

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.render('signup', { error: req.flash('error') })
  })
  
  router.post('/', [
    check(req.body.password)
    .exists()
    .matches(passwordRegex),

    check(req.body.confirmPassword)
    .exists()
    .custom((value, { req }) => { value === req.body.password })
  ], passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }))

  return router
}