'use strict'
const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('signup')
})

router.post('/', (req, res) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword

  // Validation
  req.checkBody('username', 'Username is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('confirmPassword', 'Passwords do not match').equals(password)

  const errors = req.validationErrors()

  if (errors) {
    res.render('signup', {
      errors: errors
    })
  }
  else {
    const newUser = new User({
      name: username,
      email: email,
      password: password
    })

    newUser.save((err, savedUser) => {
      if (!err) {
        console.log(`User ${savedUser.name} created successfully`)
      }
    })
  }

  res.redirect('/')
})

module.exports = router