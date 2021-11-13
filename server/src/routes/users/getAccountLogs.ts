import { Request, RequestHandler } from 'express'
import { prisma } from 'db'

export const getAccountLogs: RequestHandler = async (req: Request, res, next) => {
  try {
    const logs = await prisma.nyx_account_logs.findMany({
      select: {
        date: true,
        ip: true,
        log_message: true,
        type: true,
      },
      where: { account: req.user!.memb___id },
      orderBy: [{ date: 'desc' }],
    })

    res.json(logs)
  } catch (error) {
    next(error)
  }
}
