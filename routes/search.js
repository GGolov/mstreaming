'use strict'
const router = require('express').Router()
const isAuthenticared = require('../authentication/is-authenticated')
const Song = require('../models/song')

module.exports = (passport) => {
  router
    .post('/', isAuthenticared, (req, res) => {
      Song.find({ title: { $regex: req.body.search, $options: 'i' } }, (err, results) => {
        console.log(results[0].cover.buffer)

        res.render('explore', { results: results })
      })
    })

  return router
}