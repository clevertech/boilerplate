/**
 * This way of session handling is not needed if you only do stateless sessions
 * (e.g. using JWT in HTTP headers)
 */

const { REDIS_HOST, REDIS_PORT, REDIS_PREFIX, SESSION_SECRET } = process.env;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

module.exports = app => {
  app.use(
    session({
      store: new RedisStore({
        host: REDIS_HOST,
        port: +REDIS_PORT,
        prefix: `${REDIS_PREFIX}:sess:`
      }),
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    })
  );
};
