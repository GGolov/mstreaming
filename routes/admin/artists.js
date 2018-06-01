'use strict'
const router = require('express').Router()
const isAdmin = require('../../authentication/is-admin')
const Artist = require('../../models/artist')

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      Artist.find((err, artists) => {
        res.render('admin/artists', { artists: artists })
      })
    })
    .post('/add', isAdmin, (req, res) => {
      const realName = req.body.realName.toString().trim().toLowerCase()
      const nameOfArt = req.body.nameOfArt.toString().trim().toLowerCase()
      const description = req.body.description.toString().trim().toLowerCase()

      console.log('adding artist ' + nameOfArt)

      if (nameOfArt !== null || nameOfArt !== '') {
        const artist = new Artist({
          realName: realName,
          nameOfArt: nameOfArt,
          description: description
        })

        artist.save((err) => {
          if (err) {
            throw err
          }

          res.redirect('/admin/artists')
        })
      }
    })

  return router
}