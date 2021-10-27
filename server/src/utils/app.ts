import { ErrorRequestHandler } from 'express'

export const sleep = (ms: number) => {
  return new Promise((res) => setTimeout(res, ms))
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (error) {
    console.log(`The server broke`, error.message)
    return res.status(500).json({ error: 'Unknown error occured.' })
  }

  next()
}
