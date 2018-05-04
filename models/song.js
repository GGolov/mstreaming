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

  artists: [{
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  }],

  label: String,
  order: Number,
  genre: String,
  stars: Number
})

module.exports = mongoose.model('Song', SongSchema)