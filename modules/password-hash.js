const crypto = require('crypto')

/**
 * Generates a random string of characters.
 * @param {number} length Length of the random string.
 * @returns A random string of characters.
 */
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
               .toString('hex') // Convert to hex format
               .slice(0, length) // Return required number of characters
}

/**
 * Generates the password hash using sha512.
 * @param {string} password
 * @param {string} salt
 * @returns An object with the salt and the password hash.
 */
module.exports.sha512 = (password) => {
  let hash = crypto.createHmac('sha512', generateRandomString(128))
  let value = hash.update(password).digest('hex')

  return {
    salt: salt,
    passwordHash: value
  }
}