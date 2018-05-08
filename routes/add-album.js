'use strict'
const router = require('express').Router()
const isAuthenticated = require('../authentication/middleware')

module.exports = (passport) => {
  router
    .get('/', isAuthenticated, (req, res) => {
      res.render('add-album')
    })
    .post('/', (req, res) => {
      
    })

  return router
}