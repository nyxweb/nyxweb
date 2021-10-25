import { Router } from 'express'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import { knex } from '../db'

export const auth = Router()

auth.post('/', async (req, res) => {
  const { username, password, remember } = req.body

  if (typeof username !== 'string' || !validator.isLength(username, { min: 4, max: 10 })) {
    return res.status(400).json({ error: 'Username must be between 4 and 10 characters.' })
  }

  if (typeof password !== 'string' || !validator.isLength(password, { min: 4, max: 10 })) {
    return res.status(400).json({ error: 'Password must be between 4 and 10 characters.' })
  }

  const user = await knex('MEMB_INFO')
    .select([
      'memb___id as username',
      'mail_addr as email',
      'appl_days as created_at',
      'bloc_code',
      'ctl1_code',
      'IsVip as is_vip',
      'VipExpirationTime as vip_expiration',
    ])
    .where({ memb___id: username, memb__pwd: password })
    .first()

  if (!user) return res.status(400).json({ error: 'Wrong Username or Password.' })

  const expiresIn = (remember ? 90 : 1) * 24 * 60 * 60
  const token = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn,
  })

  res.cookie('nyx_auth', token, {
    maxAge: Date.now() + expiresIn * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.ENV !== 'dev',
  })
  res.json({ token, user })
})

auth.get('/', (req, res) => {
  const token = req.cookies.nyx_auth

  try {
    if (!token) throw new Error('Not authorized')
    const payload = jwt.verify(token, process.env.JWT_SECRET!)
    res.json(payload)
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' })
  }
})
