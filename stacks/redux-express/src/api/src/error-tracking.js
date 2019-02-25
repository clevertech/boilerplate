const Raven = require('raven');

if (process.env.SENTRY_URL) {
  const raven = new Raven.Client(process.env.SENTRY_URL, {
    environment: process.env.NODE_ENV || 'no-env',
    captureUnhandledRejections: true,
    autoBreadcrumbs: true,
  });
  process.on('warning', warning => raven.captureException(warning));
}
