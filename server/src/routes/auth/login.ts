import { RequestHandler } from 'express'
import validator from 'validator'
import jwt from 'jsonwebtoken'

import { knex } from 'db'

const resourceColumns = [
  'storage',
  'zen',
  'credits',
  'chaos',
  'bless',
  'soul',
  'life',
  'creation',
  'rena',
  'stone',
  'boh',
  'box1',
  'box2',
  'box3',
  'box4',
  'box5',
  'heart',
]

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, remember } = req.body

    if (typeof username !== 'string' || !validator.isLength(username, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Username must be between 4 and 10 characters.' })
    }

    if (typeof password !== 'string' || !validator.isLength(password, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Password must be between 4 and 10 characters.' })
    }

    const user = await knex('MEMB_INFO as user')
      .select([
        'memb___id as username',
        'mail_addr as email',
        'appl_days as created_at',
        'bloc_code',
        'ctl1_code',
        'IsVip as is_vip',
        'VipExpirationTime as vip_expiration',
        ...resourceColumns,
      ])
      .where({ memb___id: username, memb__pwd: password })
      .leftJoin('nyx_resources as resources', 'user.memb___id', '=', 'resources.account')
      .first()

    if (!user) return res.status(400).json({ error: 'Wrong Username or Password.' })

    // Check and create missing user data
    const resources = await knex('nyx_resources').count('* as count').where({ account: username }).first()
    if (!resources?.count) {
      await knex('nyx_resources').insert({ account: username, storage: '' })

      resourceColumns.forEach((key) => {
        user[key] = 0
      })
      user.storage = ''
    }

    const expiresIn = (remember ? 90 : 1) * 24 * 60 * 60
    const token = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn,
    })

    res
      .cookie('nyx_auth', token, {
        maxAge: Date.now() + expiresIn * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.ENV !== 'dev',
      })
      .json(user)
  } catch (error) {
    next(error)
  }
}
