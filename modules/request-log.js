module.exports = (req, res, next) => {
  let date = new Date().toISOString()

  console.log(`${date} ${req.protocol} ${req.method} request to ${req.url} by ${req.ip}`)
  next()
}