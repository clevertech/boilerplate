const { compareSync } = require('bcrypt')

module.exports = (suppliedPass, storedPass) => {
  return compareSync(suppliedPass, storedPass)
}
