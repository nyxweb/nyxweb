import { Router } from 'express'

// Routers
import { auth } from './auth'
import { user } from './user'
import { character } from './character'
import { guild } from './guild'

export const router = Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/character', character)
router.use('/guild', guild)
