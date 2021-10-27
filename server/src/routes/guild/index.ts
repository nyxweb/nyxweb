import { Router } from 'express'

import { getGuild, getGuilds } from './getGuild'

export const guild = Router()

guild.get('/:name', getGuild)
guild.get('/', getGuilds)
