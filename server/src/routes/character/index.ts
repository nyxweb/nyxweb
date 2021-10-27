import { Router } from 'express'

import { getCharacter, getCharacters } from './getCharacter'

export const character = Router()

character.get('/:name', getCharacter)
character.get('/', getCharacters)
