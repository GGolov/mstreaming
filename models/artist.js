'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArtistSchema = new Schema({
  realName: String,

  nameOfArt: {
    type: String,
    required: true
  },

  description: String,

  albums: [{
    type: Schema.Types.ObjectId,
    ref: 'Album'
  }]
})

module.exports = mongoose.model('Artist', ArtistSchema)