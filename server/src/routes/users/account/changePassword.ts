import { Request, RequestHandler } from 'express'
import { prisma } from 'db'
import validator from 'validator'

export const changePassword: RequestHandler = async (req: Request, res, next) => {
  try {
    const { email, currentPassword, newPassword } = req.body

    if (!email || !currentPassword || !newPassword) return res.status(400).json({ error: 'Please fill in all fields.' })

    if (currentPassword === newPassword)
      return res.status(400).json({ error: 'Your old password is the same as your new password.' })

    if (typeof email !== 'string' || !validator.isEmail(email))
      return res.status(400).json({ error: 'Incorrect E-Mail Address.' })

    if (typeof currentPassword !== 'string' || !validator.isLength(currentPassword, { min: 4, max: 10 }))
      return res.status(400).json({ error: 'Incorrect password.' })

    if (typeof newPassword !== 'string' || !validator.isLength(newPassword, { min: 4, max: 10 }))
      return res.status(400).json({ error: 'Your New Password must be between 4 and 10 characters.' })

    const user = await prisma.memb_info.findFirst({
      where: { memb___id: req.user!.memb___id, memb__pwd: currentPassword, mail_addr: email },
    })

    if (!user) return res.status(400).json({ error: 'Incorrect E-Mail Address or/and Password.' })

    await prisma.memb_info.update({
      data: { memb__pwd: newPassword },
      where: { memb___id: req.user!.memb___id },
    })

    await prisma.nyx_account_logs.create({
      data: {
        account: req.user!.memb___id,
        date: new Date(),
        ip: req.ip,
        type: 'change-password',
        log_message: `Account password has been changed`,
        properties: JSON.stringify({ email, currentPassword, newPassword }),
      },
    })

    res.status(201).json({ message: `Your password was changed successfully!` })
  } catch (error) {
    next(error)
  }
}
