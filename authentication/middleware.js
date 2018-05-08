'use strict'
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(req.user)
      return next()
    }

    console.log(`${new Date().toISOString()} user not authenticated`)

    res.redirect('/')
}