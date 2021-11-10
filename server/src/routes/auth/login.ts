import { RequestHandler } from 'express'
import { getConnection, getRepository } from 'typeorm'
import validator from 'validator'
import jwt from 'jsonwebtoken'

import { MEMB_INFO, nyx_account_logs, nyx_resources } from 'db/entity'

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (typeof username !== 'string' || !validator.isLength(username, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Wrong Username or Password.' })
    }

    if (typeof password !== 'string' || !validator.isLength(password, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Wrong Username or Password.' })
    }

    const user = await getRepository(MEMB_INFO).findOne(
      { memb___id: username, memb__pwd: password },
      {
        select: [
          'memb___id',
          'mail_addr',
          'appl_days',
          'bloc_code',
          'ctl1_code',
          'IsVip',
          'VipExpirationTime',
          'resources',
        ],
        relations: ['resources'],
      },
    )

    if (!user) return res.status(400).json({ error: 'Wrong Username or Password.' })

    if (!user.resources) {
      const resources = new nyx_resources()
      resources.account = user.memb___id
      user.resources = resources
      await getConnection().manager.save(resources)
    }

    const { resources, ...payload } = user
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    await getRepository(nyx_account_logs).insert({
      account: user.memb___id,
      date: new Date(),
      ip: req.ip,
      type: 'website-login',
      log_message: `Website login`,
    })

    res
      .cookie('nyx_auth', token, {
        maxAge: 7 * 86400000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.ENV !== 'dev',
      })
      .json(user)
  } catch (error) {
    next(error)
  }
}
