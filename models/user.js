'use strict'
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', function(next) {
  const user = this

  bcrypt.genSalt(12, (err, salt) => {
      bcrypt.hash(user.passwordHash, salt, (err, hash) => {
        user.passwordHash = hash
      })
  })
})

UserSchema.methods.comparePassword = function(newPassword, next) {
  bcrypt.compare(newPassword, this.password, (err, isMatch) => {
    if (err) return next(err)
    
    next(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserSchema)