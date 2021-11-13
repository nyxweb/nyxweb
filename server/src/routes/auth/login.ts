import { RequestHandler } from 'express'
import { prisma } from 'db'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body

    if (typeof username !== 'string' || !validator.isLength(username, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Wrong Username or Password.' })
    }

    if (typeof password !== 'string' || !validator.isLength(password, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Wrong Username or Password.' })
    }

    const user = await prisma.memb_info.findFirst({
      select: {
        memb___id: true,
        appl_days: true,
        bloc_code: true,
        ctl1_code: true,
        IsVip: true,
        VipExpirationTime: true,
        resources: true,
        memb_stat: {
          select: {
            ConnectStat: true,
            ConnectTM: true,
            DisConnectTM: true,
            IP: true,
          },
        },
      },
      where: { memb___id: username },
    })

    if (!user) return res.status(400).json({ error: 'Wrong Username or Password.' })

    if (!user.resources) {
      user.resources = await prisma.nyx_resources.create({
        data: { account: user.memb___id, storage: '' },
      })
    }

    const { resources, ...payload } = user
    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    })

    await prisma.nyx_account_logs.create({
      data: {
        account: user.memb___id,
        date: new Date(),
        ip: req.ip,
        type: 'website-login',
        log_message: `Website login`,
        properties: JSON.stringify({ 'user-agent': req.headers['user-agent'] }),
      },
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
