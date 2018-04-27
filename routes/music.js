'use strict'
const fs = require('fs')
const router = require('express').Router()
const isAuthenticated = require('../authentication/middleware')

module.exports = (passport) => {
  router.get('/', (req, res) => {
    
  })

  return router
}