'use strict'
const router = require('express').Router()
const isAdmin = require('../authentication/is-admin')

module.exports = (passport) => {
  router
    .get('/', isAdmin, (req, res) => {
      if (req.user.admin) {
        res.render('add-album')
      }
    })
    .post('/', isAdmin, (req, res) => {
      
    })

  return router
}