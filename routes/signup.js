const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('signup')
})

router.post('/', (req, res) => {
  let email = req.body.email
  let password = req.body.password
  let confirmPassword = req.body.confirmPassword

  // Validation
  req.checkBody('email', 'Email is required').notEmpty()
  req.checkBody('email', 'Email is not valid').isEmail()
  req.checkBody('password', 'Password is required').notEmpty()
  req.checkBody('confirmPassword', 'Passwords do not match').equals(password)

  let errors = req.validationErrors()

  if (errors) {
    res.render('signup', {
      errors: errors
    })
  }
  else {
    console.log(`Registration of ${email} completed successfully`)
  }
})

module.exports = router