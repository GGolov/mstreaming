const crypto = require('crypto')
const mongoose = require('mongoose')
const passwordHash = require('password-hash')

mongoose.connect('mongodb://localhost/musicstreaming')

const db = mongoose.connection

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  registrationDate: {
    type: Date
  }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = (newUser, callback) => {
  const values = passwordHash.sha512(newUser.password)

  newUser.password = values.passwordHash
  newUser.salt = values.salt
  newUser.save(callback)
}