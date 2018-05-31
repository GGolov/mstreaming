'use strict'
const router = require('express').Router()
const isAdmin = require('../../authentication/is-admin')
const Album = require('../../models/album')

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      res.render('albums')
    })

  return router
}