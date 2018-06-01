'use strict'
const router = require('express').Router()
const isAdmin = require('../../authentication/is-admin')
const Album = require('../../models/album')
const Artist = require('../../models/artist')

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      Artist.find((err, artists) => {
        res.render('admin/albums', { artists: artists })
      })
    })
    .post('/add', isAdmin, (req, res) => {

    })

  return router
}