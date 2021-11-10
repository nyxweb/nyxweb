import { MEMB_INFO, nyx_account_logs } from 'db/entity'
import { Request, RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import validator from 'validator'

export const changePassword: RequestHandler = async (req: Request, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const userRepository = getRepository(MEMB_INFO)

    if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Please fill in all required fields.' })

    if (currentPassword === newPassword)
      return res.status(400).json({ error: 'Your old password is the same as your new password.' })

    if (typeof currentPassword !== 'string' || !validator.isLength(currentPassword, { min: 4, max: 10 }))
      return res.status(400).json({ error: 'Incorrect password.' })

    if (typeof newPassword !== 'string' || !validator.isLength(newPassword, { min: 4, max: 10 }))
      return res.status(400).json({ error: 'Your New Password must be between 4 and 10 characters.' })

    const user = await userRepository.findOne({ memb___id: req.user!.memb___id, memb__pwd: currentPassword })
    if (!user) return res.status(400).json({ error: 'Incorrect password.' })

    user.memb__pwd = newPassword
    await userRepository.save(user)

    await getRepository(nyx_account_logs).insert({
      account: req.user!.memb___id,
      date: new Date(),
      ip: req.ip,
      type: 'change-password',
      log_message: `Account password changed`,
      properties: JSON.stringify({ currentPassword, newPassword }),
    })

    res.status(201).json({ message: `Your password was changed successfully!` })
  } catch (error) {
    next(error)
  }
}
