const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('signin')
})

router.post('/', (req, res) => {
  let email = req.body.email
  let password = req.body.password


})

module.exports = router