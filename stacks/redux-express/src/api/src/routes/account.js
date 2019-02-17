const express = require('express');

const useragent = require('useragent');
const { Unauthorized, asyncMiddleware } = require('../utils/errors');
const { auth, languages } = require('./auth');
const { sessionJWT } = require('../utils/jwt');
const ensureAuthenticated = require('../utils/ensureAuthenticated');

const clientInfo = req => {
  const agent = useragent.lookup(req.headers['user-agent']);
  return {
    agent: agent.toAgent(),
    os: agent.os.toString(),
    device: agent.device.toString(),
    ip: req.ip,
    language: req.acceptsLanguages(...languages)
  };
};

const obfuscatePhone = phone => {
  if (!phone) return '';
  return (
    phone.substring(0, 4) +
    phone.substring(4, phone.length - 4).replace(/\d/g, '*') +
    phone.substring(phone.length - 4)
  );
};

module.exports = app => {
  const router = express.Router();
  app.use('/account', router);

  router.post(
    '/login',
    asyncMiddleware(async (req, res) => {
      const { email, password } = req.body;
      const user = await auth.login(email, password);
      if (!user) {
        throw new Unauthorized('Invalid username or password');
      }
      if (!user.emailConfirmed) {
        throw new Unauthorized('Check your inbox and confirm your email address first');
      }
      if (user.twofactor === 'sms') {
        await auth.send2FASMS(user, user.twofactorSecret, user.twofactorPhone);
      }
      const userData = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id
      };
      const authenticated = !user.twofactor;
      // TODO get token from api
      const token = await sessionJWT.sign({ ...userData, authenticated });
      res.json({
        user: userData,
        token,
        authenticated,
        twofactor: user.twofactor,
        twofactorPhone: obfuscatePhone(user.twofactorPhone)
      });
    })
  );

  router.post(
    '/login/2fa',
    asyncMiddleware(async (req, res) => {
      const { jwt, token } = req.body;
      const jwtData = await sessionJWT.verify(jwt);
      const user = await auth.validate2FAToken(jwtData.id, token);
      if (!user) {
        throw new Unauthorized('Invalid authentication code');
      }
      const userData = { name: user.name, email: user.email, id: user.id };
      // TODO get token from api
      const authToken = await sessionJWT.sign({ ...userData, authenticated: true });
      res.json({
        user: userData,
        token: authToken,
        authenticated: true
      });
    })
  );

  router.post(
    '/register',
    asyncMiddleware(async (req, res) => {
      const { username, firstName, lastName, email, password } = req.body;
      const data = { username, firstName, lastName, email, password };
      await auth.register(data, clientInfo(req));
      res.json({});
    })
  );

  router.post(
    '/forgot-password',
    asyncMiddleware(async (req, res) => {
      const { email } = req.body;
      req.app.logger.info('reset password', email);
      await auth.forgotPassword(email, clientInfo(req));
      res.json({});
    })
  );

  router.post(
    '/reset-password',
    asyncMiddleware(async (req, res) => {
      const { token, password } = req.body;
      await auth.resetPassword(token, password, clientInfo(req));
      res.json({});
    })
  );

  router.post(
    '/confirm-email',
    asyncMiddleware(async (req, res) => {
      const { token } = req.body;
      await auth.confirmEmail(token);
      res.json({});
    })
  );

  const settings = express.Router();
  settings.use(ensureAuthenticated);
  app.use('/account/settings', settings);

  settings.get(
    '/get-account',
    asyncMiddleware(async (req, res) => {
      const { username, firstName, lastName, email } = req.user;
      const user = { username, firstName, lastName, email };
      res.json({ user });
    })
  );

  settings.post(
    '/change-password',
    asyncMiddleware(async (req, res) => {
      const { id } = req.user;
      const { oldPassword, newPassword } = req.body;
      await auth.changePassword(id, oldPassword, newPassword);
      res.json({});
    })
  );

  settings.post(
    '/generate-two-factor-qr',
    asyncMiddleware(async (req, res) => {
      const secret = await auth.generate2FASecret(req.user);
      const qr = await auth.generate2FAQRCodeURL(req.user, secret);
      res.json({ secret, qr });
    })
  );

  settings.post(
    '/configure-two-factor-qr',
    asyncMiddleware(async (req, res) => {
      const { token, secret } = req.body;
      const codes = await auth.configure2FAQR(req.user, token, secret);
      res.json({ codes });
    })
  );

  settings.post(
    '/generate-two-factor-sms',
    asyncMiddleware(async (req, res) => {
      const { phoneNumber } = req.body;
      const secret = await auth.generate2FASecret(req.user);
      const qr = await auth.send2FASMS(req.user, secret, phoneNumber);
      res.json({ phoneNumber, secret, qr });
    })
  );

  settings.post(
    '/configure-two-factor-sms',
    asyncMiddleware(async (req, res) => {
      const { token, secret } = req.body;
      const codes = await auth.configure2FAQR(req.user, token, secret);
      res.json({ codes });
    })
  );

  settings.get(
    '/two-factor-status',
    asyncMiddleware(async (req, res) => {
      const data = await auth.get2FAStatus(req.user.id);
      res.json(data);
    })
  );

  settings.post(
    '/two-factor-disable',
    asyncMiddleware(async (req, res) => {
      const { password } = req.body;
      await auth.disable2FA(req.user.id, password);
      res.json({});
    })
  );
};
