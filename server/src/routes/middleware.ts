import { Request, RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'

import { knex } from 'db'
import { User } from 'typings'

export const auth: RequestHandler = async (req: Request, res, next) => {
  try {
    const { nyx_auth } = parse(req.cookies)

    const payload = verify(nyx_auth, process.env.JWT_SECRET!)

    if (!payload) return res.status(401).json({ error: 'Not authorized' })

    const user: User = await knex('MEMB_INFO')
      .select(
        'memb___id as username',
        'mail_addr as email',
        'appl_days as created_at',
        'bloc_code',
        'ctl1_code',
        'IsVip as is_vip',
        'VipExpirationTime as vip_expiration',
      )
      .where({ memb___id: payload.username, mail_addr: payload.email })
      .first()

    if (!user) return res.status(401).json({ error: 'Not authorized' })

    if (Number(user.bloc_code) !== 0) return res.status(403).json({ error: 'This account is blocked.' })

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}
