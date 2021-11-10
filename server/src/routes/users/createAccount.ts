import { MEMB_INFO, nyx_account_logs } from 'db/entity'
import { RequestHandler } from 'express'
import { getRepository } from 'typeorm'
import validator from 'validator'

export const createAccount: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, email } = req.body
    const userRepository = getRepository(MEMB_INFO)

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

    const usernameCheck = await userRepository.findOne({ memb___id: username })
    if (usernameCheck) return res.status(400).json({ error: 'This Username is already taken.' })

    const emailCheck = await userRepository.findOne({ mail_addr: email })
    if (emailCheck) return res.status(400).json({ error: 'This E-Mail Address has already been used.' })

    const user = new MEMB_INFO()
    user.memb___id = username
    user.memb__pwd = password
    user.mail_addr = email
    await userRepository.save(user)

    await getRepository(nyx_account_logs).insert({
      account: username,
      date: new Date(),
      ip: req.ip,
      type: 'new_account',
      log_message: `Account created.`,
      properties: JSON.stringify({ username, password, email }),
    })

    res.status(201).json({ message: `Welcome, ${username}! You can now login!` })
  } catch (error) {
    next(error)
  }
}
