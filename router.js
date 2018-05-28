'use strict'
const router = require('express').Router()

const home = require('./routes/home')
const signin = require('./routes/signin')
const signup = require('./routes/signup')
const profile = require('./routes/profile')
const logout = require('./routes/logout')
const music = require('./routes/music')
const addAlbum = require('./routes/add-album')
const explore = require('./routes/explore')
const admin = require('./routes/admin')

module.exports = (passport) => {
  router
    .use('/', home(passport))
    .use('/signin', signin(passport))
    .use('/signup', signup(passport))
    .use('/profile', profile(passport))
    .use('/logout', logout(passport))
    .use('/music', music(passport))
    .use('/add-album', addAlbum(passport))
    .use('/explore', explore(passport))
    .use('/admin', admin(passport))

  return router
}