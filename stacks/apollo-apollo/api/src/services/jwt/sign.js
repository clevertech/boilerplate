const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

// given a user sign and return the token
module.exports = (user) => {
  const payload = {
    id: user.id,
    email: user.email
  }
  // generate a jwt token for testing purposes
  // in GraphQL Playground the HTTP Header can be used like so...
  // { "Authorization": "Bearer abc.123.xyz" }
  return jwt.sign(payload, JWT_SECRET)
}
