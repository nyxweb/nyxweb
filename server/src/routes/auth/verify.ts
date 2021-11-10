import { RequestHandler } from 'express'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export const verify: RequestHandler = (req, res) => {
  const token = req.cookies.nyx_auth

  try {
    if (!token || !validator.isJWT(token)) throw new Error('Not authorized')

    const payload = jwt.verify(token, process.env.JWT_SECRET!)

    // Renew JWT so the user stays logged in
    delete payload.exp
    delete payload.aud
    delete payload.iat
    delete payload.iss
    delete payload.jti
    delete payload.nbf
    delete payload.sub
    const freshToken = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    res
      .cookie('nyx_auth', freshToken, {
        maxAge: 7 * 86400000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.ENV !== 'dev',
      })
      .json(payload)
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' })
  }
}
