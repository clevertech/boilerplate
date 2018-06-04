const {
  Core,
  Crypto,
  DefaultEmailService,
  JWT,
  KnexAdapter,
  Validations
} = require('@clevertech.biz/auth-core');
const fs = require('fs');
const { join } = require('path');
const knexConfig = require('../../knexfile');

const db = new KnexAdapter(knexConfig);

db.init();

const { CRYPTO_KEY, CRYPTO_ALGORITHM, JWT_ALGORITHM, JWT_SECRET, DEFAULT_FROM } = process.env;

const sms = null;
const templatesDir = join(__dirname, '../../email-templates');
const languages = fs.readdirSync(templatesDir);

const auth = new Core({
  projectName: 'Boilerplate',
  db,
  email: new DefaultEmailService({
    projectName: 'Boilerplate',
    confirmEmailURL: 'http://localhost:9020/account/confirm-email',
    requestResetPasswordURL: 'http://localhost:9020/account/forgot-password',
    resetPasswordURL: 'http://localhost:9020/account/reset-password',
    emailServiceConfig: {
      DEFAULT_FROM,
      TEMPLATES_DIR: templatesDir
    }
  }),
  crypto: new Crypto(CRYPTO_KEY, CRYPTO_ALGORITHM),
  jwt: new JWT(JWT_ALGORITHM, JWT_SECRET, JWT_SECRET, {
    // default options: see https://github.com/auth0/node-jsonwebtoken#usage
  }),
  validations: new Validations(['username', 'firstName', 'lastName'], true),
  sms,
  numberOfRecoverCodes: 10
});

module.exports = { auth, languages };
