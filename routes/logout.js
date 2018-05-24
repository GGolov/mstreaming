'use strict'
const router = require('express').Router()

module.exports = (passport) => {
  router.get('/', (req, res) => {
    console.log(`${req.user.local.email} logged out`)
    req.logout()
    res.redirect('/')
  })

  return router
}