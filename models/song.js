'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
  path: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  label: String,
  order: Number,
  genre: String,
  stars: Number,

  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album'
  }
})

module.exports = mongoose.model('Song', SongSchema)