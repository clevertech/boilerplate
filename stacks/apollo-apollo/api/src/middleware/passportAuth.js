const passport = require('passport')
const passportJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('../utils/errors')

const { JWT_SECRET } = process.env
const { Strategy, ExtractJwt } = passportJWT

// static list of users
const users = [
  {
    id: 1,
    name: 'John',
    email: 'john@mail.com',
    password: 'john123'
  }
]

// generate a jwt token for testing purposes
// in GraphQL Playground the HTTP Header can be used like so...
// { "Authorization": "Bearer abc.123.xyz" }
console.log(jwt.sign(users[0], JWT_SECRET))

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, (payload, done) => {
  // load the user from the data source for your users
  const user = users.find(user => user.id === payload.id) || null

  let err = null
  if (!user) {
     err = new Unauthorized('Authorization header failed verification')
  }

  return done(err, user)
})

passport.use(strategy)
passport.initialize()

// middleware to check for auth in Express
// req object will be available to Apollo via the context
module.exports = function passportAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // check for the user, this will be populated as result of the passport strategy
    if (user) {
      req.user = user
    } else {
      // pass a null user: allows graphql at least in part be public
      req.user = null
      // or throw an error: blocks all access to graphql for non-public
      // return next(new Unauthorized('Authorization header failed verification'))
    }

    next()
  })(req, res, next)
}
