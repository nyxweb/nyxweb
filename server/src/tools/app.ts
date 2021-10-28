import { ErrorRequestHandler } from 'express'
import { logger } from 'tools'

export const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms))
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error) {
    logger.error(`Unhandled error`, { error: error.message })
    return res.status(500).json({ error: 'Unknown error occured.' })
  }

  next()
}
