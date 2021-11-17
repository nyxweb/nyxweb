import { Request, RequestHandler } from 'express'
import { prisma } from 'db'

export const getAccountInfo: RequestHandler = async (req: Request, res, next) => {
  try {
    const user = await prisma.memb_info.findFirst({
      select: {
        appl_days: true,
        bloc_code: true,
        IsVip: true,
        VipExpirationTime: true,
        memb_stat: {
          select: {
            ConnectStat: true,
            ConnectTM: true,
            DisConnectTM: true,
            IP: true,
          },
        },
        logs: {
          select: {
            date: true,
            ip: true,
          },
          where: { type: 'website-login' },
          orderBy: [{ date: 'desc' }],
          take: 1,
        },
      },
      where: { memb___id: req.user!.memb___id },
    })

    res.json(user)
  } catch (error) {
    next(error)
  }
}
