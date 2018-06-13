'use strict'
const router = require('express').Router()
const isAuthenticared = require('../authentication/is-authenticated')
const Song = require('../models/song')

module.exports = (passport) => {
  router
    .get('/', isAuthenticared, (req, res) => {
      Song
        .find()
        .then(
          (results) => res.render('explore', { all: results }),
          (err) => { throw err }
        )
    })

  return router
}