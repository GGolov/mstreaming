'use strict'
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  local: {
    email: {
      type: String,
      required: true,
      index: true
    },
    password: {
      type: String,
      require: true
    }
  },

  facebook: {
      id: String,
      token: String,
      name: String,
      email: String
  },

  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },

  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },

  registrationDate: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save')

module.exports = mongoose.model('User', UserSchema)