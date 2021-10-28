import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((data) => `${data.timestamp}: ${data.message}`),
  ),
  transports: [new transports.File({ filename: 'logs/errors.log' })],
})

// if (process.env.NODE_ENV !== 'production') {
logger.add(
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
      format.printf((data) => `${data.timestamp} [${data.level}]: ${data.message}`),
    ),
  }),
)
// }
