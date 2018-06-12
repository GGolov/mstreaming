'use strict'
const router = require('express').Router()
const isAdmin = require('../../authentication/is-admin')
const Song = require('../../models/song')
const multer = require('multer')
const nodeID3 = require('node-id3')
const fs = require('fs')
const storage = require('../../storage/storage')

const upload = multer({ storage: storage })

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      res.render('admin/songs')
    })
    .post('/add', isAdmin, upload.array('songs'), (req, res) => {
      const songs = req.files
      
      songs.forEach((song) => {
        nodeID3.read('../../music/' + song.filename, (err, tags) => {
          if (err) {
            throw err
          }

          console.log(tags)

          const newSong = new Song({
            title: tags.title,
            artist: tags.artist,
            publisher: tags.publisher,
            order: tags.trackNumber,
            genre: tags.genre,
            year: tags.year,
            duration: tags.length,
            album: tags.album,
            filename: song.filename
          })

          newSong.save()
        })

        res.redirect('/admin/songs')
      })
    })

  return router
}