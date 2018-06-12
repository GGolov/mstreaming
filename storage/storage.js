const multer = require('multer')
const mime = require('mime')
const crypto = require('crypto')

module.exports = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../music')
  },
  filename: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype))
    })
  }
})