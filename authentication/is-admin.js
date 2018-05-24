'use strict'
module.exports = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
      console.log('Admin authenticated')
      return next()
    }

    console.log(`Admin not authenticated`)

    res.redirect('/error/302')
}