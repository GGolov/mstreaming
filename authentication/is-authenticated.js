'use strict'
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('User authenticated')
      return next()
    }

    console.log(`User not authenticated`)

    res.redirect('/')
}