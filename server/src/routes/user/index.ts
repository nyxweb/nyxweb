import { Router } from 'express'

import { createAccount } from './createAccount'

export const user = Router()

user.post('/', createAccount)
