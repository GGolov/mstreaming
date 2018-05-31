'use strict'
const router = require('express').Router()
const isAdmin = require('../../authentication/is-admin')
const Artist = require('../../models/artist')

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      Artist.find((err, artists) => {
        res.render('artists', { artists: artists })
      })
    })

  return router
}