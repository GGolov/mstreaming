'use strict'
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) 
      return next()

    console.log(`${new Date().toISOString()} user not authenticated`)

    res.redirect('/')
}