'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
  fileName: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  artist: String,
  publisher: String,
  order: Number,
  genre: String,
  year: Number,
  duration: Number,

  stars: {
    type: Number,
    set: v => Math.round(Math.abs(v)),
    max: 5
  },

  cover: {
    type: String,
    default: 'default.png'
  },

  album: String
})

module.exports = mongoose.model('Song', SongSchema)