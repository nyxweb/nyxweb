import { Router } from 'express'

import { login } from './login'
import { logout } from './logout'
import { verify } from './verify'

export const auth = Router()

auth.post('/', login)
auth.delete('/', logout)
auth.get('/', verify)
