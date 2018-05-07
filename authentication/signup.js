'use strict'
const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12), null)
}

module.exports = (passport) => {
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({ 'local.email': email }, (err, user) => {
        if (err) {
          return done(err)
        }

        // If user already exists
        if (user) {
          return done(null, false,
            req.flash('message', 'Email already registered')
          )
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

            console.log(`${new Date().toISOString()} ${newUser.local.email} registered as local`)

            return done(null, newUser)
          })
        }
      })
    })
  }))
}