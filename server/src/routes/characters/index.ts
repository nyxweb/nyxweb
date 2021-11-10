import { Router } from 'express'

import { getOne, getMany, getHOF } from './get'

export const characters = Router()

characters.get('/hof', getHOF)
characters.get('/:name', getOne)
characters.get('/', getMany)
