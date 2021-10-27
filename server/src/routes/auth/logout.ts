import { RequestHandler } from 'express'

export const logout: RequestHandler = (_req, res) => {
  res.clearCookie('nyx_auth').status(204).end()
}
