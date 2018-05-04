'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  songs: [{
    type: Schema.Types.ObjectId,
    ref: 'Song'
  }],

  artists: [{
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  }],

  year: Number,
  
  cover: {
    type: String,
    default: '/public/img/covers/default.jpg'
  }
})

module.exports = mongoose.model('Album', AlbumSchema)