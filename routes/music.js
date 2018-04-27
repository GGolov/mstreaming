'use strict'
const fs = require('fs')
const router = require('express').Router()
const isAuthenticated = require('../authentication/middleware')

module.exports = (passport) => {
  router.get('/:id', isAuthenticated, (req, res) => {
    fs.createReadStream(__dirname + '/../music/' + req.params.id + '.mp3').pipe(res)
  })

  return router
}