/**
 * Utils 
 */

const bcrypt = require('bcryptjs')

/**
 * Validate email address
 */
const validateEmailAddress = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * Hash password
 * @param {*} user 
 */
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

/**
 * Compare password
 */
const comparePassword = (candidatePassword, trustedPassword) => {
  return bcrypt.compareSync(candidatePassword, trustedPassword)
}

module.exports = {
  hashPassword,
  comparePassword,
  validateEmailAddress
}