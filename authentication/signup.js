'use strict'
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const validationResult = require('express-validator/check').validationResult
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(16), null)
}

module.exports = (passport) => {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    /**
     * This regex enforces these rules:
     * At least one upper case English letter, (?=.*?[A-Z])
     * At least one lower case English letter, (?=.*?[a-z])
     * At least one digit, (?=.*?[0-9])
     * At least one special character, (?=.*?[#?!@$%^&*-])
     * Minimum eight in length .{8,} (with the anchors)
     */
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const validationResult = require('express-validator/check').validationResult

    if (!validationResult(req).isEmpty()) {
      return done(null, false, req.flash('error', validationResult(req).mapped()))
    }

    process.nextTick(() => {
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err) {
          return done(err)
        }

        // If user already exists
        if (user) {
          return done(null, false, req.flash('error', 'Email already registered'))
        }
        else {
          const newUser = new User()

          newUser.local.name = req.body.username
          newUser.local.email = email
          newUser.local.password = createHash(password)

          newUser.save((err) => {
            if (err) {
              throw err
            }

            console.log(`${newUser.local.email} registered as local`)

            return done(null, newUser)
          })
        }
      })
    })
  }))
}