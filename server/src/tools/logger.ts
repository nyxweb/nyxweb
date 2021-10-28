import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((data) => {
          const { timestamp, level, message, ...rest } = data
          return `${timestamp} [${level}]: ${message} ${JSON.stringify(rest)}`
        }),
      ),
    }),
    new transports.File({
      filename: 'logs/errors.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),
    new transports.File({
      filename: 'logs/combined.log',
      format: format.combine(format.timestamp(), format.prettyPrint()),
    }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/exceptions.log',
    }),
  ],
})
