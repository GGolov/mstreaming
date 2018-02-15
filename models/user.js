const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost/musicstreaming')

const db = mongoose.connection

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(12, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      
    })
  })
}