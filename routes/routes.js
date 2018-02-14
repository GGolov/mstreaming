const router = require('express').Router()

const home = require('./home')
const signin = require('./signin')
const signup = require('./signup')

router.use('/', home)
router.use('/signin', signin)
router.use('/signup', signup)

module.exports = router