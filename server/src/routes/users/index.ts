import { Router } from 'express'

import { createAccount } from './createAccount'

export const users = Router()

users.post('/', createAccount)
