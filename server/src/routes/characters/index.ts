import { Router } from 'express'

import { getCharacter, getCharacters } from './getCharacter'

export const characters = Router()

characters.get('/:name', getCharacter)
characters.get('/', getCharacters)
