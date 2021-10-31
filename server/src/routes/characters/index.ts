import { Router } from 'express'
import { auth } from 'routes/middleware'

import { getOne, getMany, getHOF } from './get'
import { reset } from './reset'

export const characters = Router()

characters.get('/hof', getHOF)
characters.get('/:name', getOne)
characters.get('/', getMany)
characters.put('/:name/reset', auth, reset)
