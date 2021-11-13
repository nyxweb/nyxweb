import { Router } from 'express'
import { auth } from 'routes/middleware'

import { createAccount } from './createAccount'
import { changePassword } from './changePassword'
import { getAccountLogs } from './getAccountLogs'
import { getAccountInfo } from './getAccountInfo'

export const users = Router()

users.post('/', createAccount)
users.post('/password', auth, changePassword)
users.get('/logs', auth, getAccountLogs)

users.get('/account/logs', auth, getAccountLogs)
users.get('/account/info', auth, getAccountInfo)
