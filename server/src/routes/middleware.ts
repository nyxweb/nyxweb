import { Request, RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'

import { getRepository } from 'typeorm'
import { MEMB_INFO } from 'db/entity'

export const auth: RequestHandler = async (req: Request, res, next) => {
  try {
    const { nyx_auth } = parse(req.cookies)
    const payload = verify(nyx_auth, process.env.JWT_SECRET!)
    const userRepository = getRepository(MEMB_INFO)

    if (!payload) return res.status(401).json({ error: 'Not authorized' })

    const user = await userRepository.findOne(
      { memb___id: payload.memb___id, mail_addr: payload.mail_addr },
      { select: ['memb___id', 'mail_addr', 'appl_days', 'bloc_code', 'ctl1_code', 'IsVip', 'VipExpirationTime'] },
    )

    if (!user) return res.status(401).json({ error: 'Not authorized' })

    if (Number(user.bloc_code) !== 0) return res.status(403).json({ error: 'This account is blocked.' })

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}
