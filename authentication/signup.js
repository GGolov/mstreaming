'use strict'
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (passport) => {
  passport.use('signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, email, password, done) => {
    const findOrCreateUser = () => {
      User.findOne({ 'email': email }, (err, user) => {
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
          const newUser = new User({
            'email': email,
            'password': createHash(password)
          })

          newUser.save((err) => {
            if (err) {
              throw err
            }
            console.log(`${newUser.email} registered`)

            return done(null, newUser)
          })
        }
      })
    }

    process.nextTick(findOrCreateUser)
  }))

  const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
  }
}