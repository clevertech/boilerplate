const passport = require('passport')
const passportJWT = require('passport-jwt')
const getUsers = require('../services/getUsers')
const { find } = require('lodash')

const { JWT_SECRET } = process.env
const { Strategy, ExtractJwt } = passportJWT

// TODO Remove this: the purpose is to demonstrate how to use the token with GraphQL Playground
const jwtSign = require('../services/jwt/sign')
getUsers().then((users) => {
  // get a token for debugging
  const token = jwtSign(users[0])

  // log how to use this for demo
  console.log('Use the following HTTP HEADER for auth...')
  console.log(`{ "Authorization": "Bearer ${token}" }`)
})

// Refer to Passport auth strategies
// http://www.passportjs.org/packages/
const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, async (payload, done) => {
  // load the user from the data source for your users
  const users = await getUsers()
  const user = find(users, { id: payload.id })

  return done(null, user)
})

passport.use(strategy)
passport.initialize()

// middleware to check for auth in Express
// req object will be available to Apollo via the context
module.exports = function passportAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log('auth', {err, user, info})
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
