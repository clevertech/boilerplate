const passport = require('passport')
const passportJWT = require('passport-jwt')
const { User } = require('../services/models')

const { JWT_SECRET } = process.env
const { Strategy, ExtractJwt } = passportJWT

// Refer to Passport auth strategies
// http://www.passportjs.org/packages/
const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, async (payload, done) => {
  // load the user from the data source for your users
  return User.query().findById(payload.id).then((user) => {
    // return found user for passport authenticate handler
    done(null, user)
  }).catch((e) => {
    // user not found
    done()
  })
})

passport.use(strategy)
passport.initialize()

// middleware to check for auth in Express
// req object will be available to Apollo via the context
module.exports = function passportAuth(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
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
