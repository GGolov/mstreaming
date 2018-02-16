const router = require('express').Router()
const mongoose = require('mongoose')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('signup')
})

router.post('/', (req, res) => {
  let username = req.body.username
  let email = req.body.email
  let password = req.body.password
  let confirmPassword = req.body.confirmPassword

  // Validation
  req.checkBody('username', 'Username is required').notEmpty()
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('confirmPassword', 'Passwords do not match').equals(password)

  let errors = req.validationErrors()

  if (errors) {
    res.render('signup', {
      errors: errors
    })
  }
  else {
    let newUser = new User({
      name: username,
      email: email,
      password: password
    })

    User.createUser(newUser)

    console.log(`Registration of ${email} completed successfully`)

    res.redirect('/signin')
  }
})

module.exports = router