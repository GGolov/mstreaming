'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },

  year: Number,
  
  cover: {
    type: String,
    default: '/public/img/covers/default.jpg'
  },

  insertionDate: {
    type: Date,
    default: Date.now
  },

  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }]
})

module.exports = mongoose.model('Album', AlbumSchema)