import { Request, RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { prisma } from 'db'

export const auth: RequestHandler = async (req: Request, res, next) => {
  try {
    const { nyx_auth } = req.cookies
    const { account } = verify(nyx_auth, process.env.JWT_SECRET!)

    if (!account) return res.status(401).json({ error: 'Not authorized' })

    const user = await prisma.memb_info.findFirst({
      select: {
        memb___id: true,
        mail_addr: true,
        appl_days: true,
        bloc_code: true,
        ctl1_code: true,
        IsVip: true,
        VipExpirationTime: true,
      },
      where: { memb___id: account },
    })

    if (!user) return res.status(401).json({ error: 'Not authorized' })

    if (Number(user.bloc_code) !== 0) return res.status(403).json({ error: 'This account is blocked.' })

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' })
  }
}
