const {
  Core,
  Crypto,
  DefaultEmailService,
  TwilioSMSService,
  JWT,
  KnexAdapter,
  Validations
} = require('@clevertech.biz/auth-core');
const fs = require('fs');
const { join } = require('path');
const knexConfig = require('../../knexfile');

const db = new KnexAdapter(knexConfig);

db.init();

const {
  CRYPTO_KEY,
  CRYPTO_ALGORITHM,
  JWT_ALGORITHM,
  JWT_SECRET,
  DEFAULT_FROM,
  BASE_URL,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER_FROM
} = process.env;

const sms = new TwilioSMSService(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER_FROM);

const templatesDir = join(__dirname, '../../email-templates');
const languages = fs.readdirSync(templatesDir);

const auth = new Core({
  projectName: 'Boilerplate',
  db,
  email: new DefaultEmailService({
    projectName: 'Boilerplate',
    confirmEmailURL: `${BASE_URL}/account/confirm-email`,
    requestResetPasswordURL: `${BASE_URL}/account/forgot-password`,
    resetPasswordURL: `${BASE_URL}/account/reset-password`,
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
