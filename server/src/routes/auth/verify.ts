import { RequestHandler } from 'express'
import { prisma } from 'db'
import validator from 'validator'
import jwt from 'jsonwebtoken'

export const verify: RequestHandler = async (req, res) => {
  const token = req.cookies.nyx_auth

  try {
    if (!token || !validator.isJWT(token)) throw new Error('Not authorized')

    const { memb___id } = jwt.verify(token, process.env.JWT_SECRET!)

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
      where: { memb___id },
    })

    if (!user) return res.status(401).json({ error: 'Not authorized' })

    const { resources, ...payload } = user

    // Renew JWT so the user stays logged in
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
      .json(user)
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' })
  }
}
