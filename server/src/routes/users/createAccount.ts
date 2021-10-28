import { RequestHandler } from 'express'
import validator from 'validator'

import { knex } from 'db'

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

    const usernameCheck = await knex('MEMB_INFO').count('* as total').where({ memb___id: username }).first()

    if (usernameCheck?.total !== 0) {
      return res.status(400).json({ error: 'This Username is already taken.' })
    }

    const emailCheck = await knex('MEMB_INFO').count('* as total').where({ mail_addr: email }).first()

    if (emailCheck?.total !== 0) {
      return res.status(400).json({ error: 'This E-Mail Address has already been used.' })
    }

    const created_at = new Date()
    await knex('MEMB_INFO').insert({
      memb___id: username,
      memb_name: username,
      sno__numb: 'MuServer',
      memb__pwd: password,
      mail_addr: email,
      appl_days: created_at,
      modi_days: created_at,
      out__days: created_at,
      true_days: created_at,
      bloc_code: 0,
      clt1_code: 0,
      IsVip: 0,
      VipExpirationTime: 0,
    })

    res.status(201).json({ message: `Welcome, ${username}! You can now login!` })
  } catch (error) {
    next(error)
  }
}
