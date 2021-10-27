import { Router } from 'express'

import { getGuild, getGuilds } from './getGuild'

export const guilds = Router()

guilds.get('/:name', getGuild)
guilds.get('/', getGuilds)
