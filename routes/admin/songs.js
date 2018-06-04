'use strict'
const router = require('express').Router()
const isAdmin = require('../../authentication/is-admin')
const Song = require('../../models/song')
const multer = require('multer')
const nodeID3 = require('node-id3')
const fs = require('fs')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../../music')
  },
  filename: (req, file, cb) => {
    const fileHash = crypto.createHash('MD5')

    fileHash.update(Date.now().toString())

    cb(null, fileHash.digest('latin1').toString() + '.mp3')
  }
})
const upload = multer({ dest: 'music/', storage: storage })

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      res.render('admin/songs')
    })
    .post('/add', isAdmin, upload.array('songs'), (req, res) => {
      const songs = req.files

      songs.forEach((song) => {
        console.log(song)
        
        nodeID3.read(song, (err, tags) => {
          if (err) {
            throw err
          }

          console.log(tags)

          const newSong = new Song({
            title: tags.title,
            artist: tags.artist,
            publisher: tags.publisher,
            order: tags.trackNumber,
            genre: genre,
            year: year,
            duration: length,
            album: album,
            filename: song.filename
          })
        })
          
        res.redirect('/admin/songs')
      })
    })

  return router
}