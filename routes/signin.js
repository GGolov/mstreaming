const router = require('express').Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')

router.get('/', (req, res) => {
  res.render('signin')
})

router.post('/', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  mongoose.connect('mongodb://localhost:27017/musicstreaming')

  const db = mongoose.connection

  db.collection('users').findOne({
    email: email
  }, (err, user) => {
    bcrypt.compare(password, user.salt, (err, same) => {
      if (same) res.redirect('/')
      else res.render('signin', {
        error: 'no'
      })
    })
  })
})

module.exports = router