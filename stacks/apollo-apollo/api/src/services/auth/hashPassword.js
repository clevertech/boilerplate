const { hashSync } = require('bcrypt')

module.exports = (password) => {
  return hashSync(password, 10)
}
