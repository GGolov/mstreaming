'use strict'
const router = require('express').Router()
const isAdmin = require('../../authentication/is-admin')
const Song = require('../../models/song')
const multer = require('multer')
const nodeID3 = require('node-id3')
const fs = require('fs')
const crypto = require('crypto')

const upload = multer({ dest: 'music/' })

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      res.render('admin/songs')
    })
    .post('/add', isAdmin, upload.array('songs'), (req, res) => {
      const songs = req.files

      songs.forEach((song) => {
        console.log(song)
        
        nodeID3.read(song, null, (err, tags) => {
          if (err) {
            throw err
          }

          const newSong = new Song({
            title: tags.title,
            artist: tags.artist,
            publisher: tags.publisher,
            order: tags.trackNumber,
            genre: genre,
            year: year,
            duration: length,
            album: album
          })

          const coverHash = crypto.createHash('MD5')
            
          coverHash.update(Date.now())

          const coverFilename = coverHash.digest('latin1').toString() + '.png'
          const coverPath = '/public/img/covers/' + coverFilename

          fs.writeFile(__dirname + coverPath, tags.image.imageBuffer, (err) => {
            if (err) {
              throw err
            }

            newSong.cover = coverFilename

            const fileHash = crypto.createHash('MD5')
            
            fileHash.update(Date.now() + tags.title)
            newSong.filename = fileHash.digest('latin1').toString() + '.mp3'

            newSong.save((err) => {
              if (err) {
                throw err
              }

              console.log(newSong.title + ' saved')
            })

            res.redirect('/admin/songs')
          })
        })
      })
    })

  return router
}