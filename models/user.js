'use strict'
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  local: {
    name: {
      type: String,
      required: true,
      index: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
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
  },

  subscribed: {
    type: Boolean,
    default: false
  },

  admin: {
    type: Boolean,
    default: false
  },

  playlists: [{
    type: Schema.Types.ObjectId,
    ref: 'Playlist'
  }]
})

module.exports = mongoose.model('User', UserSchema)