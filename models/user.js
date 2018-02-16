const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const db = mongoose.connection

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
})

const User = module.exports = mongoose.model('User', UserSchema)

/**
 * Creates a new user.
 * @param {*} newUser User object.
 * @param {*} callback Function.
 */
module.exports.createUser = (newUser, callback) => {
  bcrypt.hash(newUser.password, 12, (err, hash) => {
    newUser.password = hash

    console.log(`Password of ${newUser.email} hashed`)

    User.create(newUser)
  })
}