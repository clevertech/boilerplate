const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'API' }), timestamp(), myFormat),
  defaultMeta: { service: 'API' },
  transports: [new transports.Console()]
});

module.exports = logger;
