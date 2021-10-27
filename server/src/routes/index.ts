import { Router } from 'express'

// Routers
import { auth } from './auth'
import { users } from './users'
import { characters } from './characters'
import { guilds } from './guilds'

export const router = Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/characters', characters)
router.use('/guilds', guilds)
