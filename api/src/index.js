const logger = require('./logger');
const app = require('./app');
const port = +process.env.PORT;

require('./error-tracking');

const server = app.listen(port, () => {
  logger.info('NODE_ENV: ' + process.env.NODE_ENV);
  logger.info(`Api listening on port ${server.address().port}!`);
});

module.exports = server;
