import { RequestHandler } from 'express'
import validator from 'validator'
import jwt from 'jsonwebtoken'

import { io } from 'app'

export const verify: RequestHandler = (req, res) => {
  const token = req.cookies.nyx_auth

  console.log([...io.sockets.sockets.values()].map((s) => s.id))

  try {
    if (!token || !validator.isJWT(token)) throw new Error('Not authorized')

    const payload = jwt.verify(token, process.env.JWT_SECRET!)

    res.json(payload)
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' })
  }
}
