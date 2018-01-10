const express = require('express');
const router = express.Router();
const { sessionJWT } = require('../utils/jwt');
const ensureAuthenticated = require('../utils/ensureAuthenticated');
const { Unauthorized } = require('../utils/errors');

module.exports = app => {
  app.use('/users', router);

  router.post('/login', async (req, res, next) => {
    try {
      // TODO: implement proper login
      const { username, password } = req.body;
      if (username !== 'admin' || password !== 'YwnR00wOyEThYLVYH3idJ') {
        return next(new Unauthorized('Invalid username or password'));
      }
      const token = await sessionJWT.sign({ username });
      res.json({
        user: {
          username
        },
        token
      });
    } catch (err) {
      next(err);
    }
  });

  /**
   * This route uses the `ensureAuthenticated` middleware. If it fails,
   * an error will be returned. If it succeeds this handler is executed
   * and req.user is filled with the data from the JWT token
   */
  router.get('/account', ensureAuthenticated, async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (err) {
      next(err);
    }
  });
};
