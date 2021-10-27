import { RequestHandler } from 'express'
import validator from 'validator'

import { knex } from 'db'

export const createAccount: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body

  if (!username || !password || !email) {
    return res.status(500).json({ error: 'user_emtpy_fields' })
  }

  if (typeof email !== 'string' || !validator.isEmail(email)) {
    return res.status(500).json({ error: 'user_invalid_email' })
  }

  if (typeof username !== 'string' || !validator.isLength(username, { min: 4, max: 10 })) {
    return res.status(500).json({ error: 'user_invalid_username' })
  }

  if (typeof password !== 'string' || !validator.isLength(password, { min: 4, max: 10 })) {
    return res.status(500).json({ error: 'user_invalid_password' })
  }

  const [usernameCheck] = await knex('MEMB_INFO').count('* as total').where({ memb___id: username })

  if (usernameCheck.total !== 0) {
    return res.status(500).json({ error: 'user_username_exists' })
  }

  const [emailCheck] = await knex('MEMB_INFO').count('* as total').where({ mail_addr: email })

  if (emailCheck.total !== 0) {
    return res.status(500).json({ error: 'user_email_exists' })
  }

  await knex.raw(
    `
    INSERT INTO MEMB_INFO (memb___id, memb_name, sno__numb, memb__pwd, mail_addr, appl_days, modi_days, out__days, true_days, bloc_code, ctl1_code, IsVip, VipExpirationTime)
    VALUES (:username, :username, 'MuServer', :password, :email, :date, :date, :date, :date, 0, 0, 0, 0)
  `,
    {
      username,
      password,
      email,
      date: new Date(),
    },
  )

  res.json({
    username,
    email,
  })
}
