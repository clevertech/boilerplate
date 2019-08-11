import { createLogger, transports } from 'winston'

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  transports: [new transports.Console()]
})
