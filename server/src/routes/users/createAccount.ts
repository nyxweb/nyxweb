import { RequestHandler } from 'express'
import { prisma } from 'db'
import validator from 'validator'

export const createAccount: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Please fill in all required fields.' })
    }

    if (typeof email !== 'string' || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid E-Mail Address.' })
    }

    if (typeof username !== 'string' || !validator.isLength(username, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Your Username must be between 4 and 10 characters.' })
    }

    if (typeof password !== 'string' || !validator.isLength(password, { min: 4, max: 10 })) {
      return res.status(400).json({ error: 'Your Password must be between 4 and 10 characters.' })
    }

    const userCheck = await prisma.memb_info.count({ where: { memb___id: username } })
    if (userCheck) return res.status(400).json({ error: 'This Username is already taken.' })

    const emailCheck = await prisma.memb_info.count({ where: { mail_addr: email } })
    if (emailCheck) return res.status(400).json({ error: 'This E-Mail Address has already been used.' })

    await prisma.memb_info.create({
      data: {
        memb___id: username,
        memb__pwd: password,
        mail_addr: email,
        bloc_code: '0',
        ctl1_code: '0',
        memb_name: 'NyxMu',
        sno__numb: 'NyxMu',
      },
    })

    await prisma.nyx_account_logs.create({
      data: {
        account: username,
        date: new Date(),
        ip: req.ip,
        type: 'new_account',
        log_message: `Account created.`,
        properties: JSON.stringify({ username, password, email }),
      },
    })

    res.status(201).json({ message: `Welcome, ${username}! You can now login!` })
  } catch (error) {
    next(error)
  }
}
