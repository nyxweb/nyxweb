import { Router } from 'express'
import { auth, requireMainCharacter } from 'routes/middleware'

import { createAccount } from './createAccount'
import { changePassword } from './changePassword'
import { getAccountLogs } from './getAccountLogs'
import { getAccountInfo } from './getAccountInfo'
import { getCharacters, setMainCharacter, changeName, changeClass } from './characters'
import { getChatDMs, getChatGlobal, getChatRecents } from './chats'

export const users = Router()

users.post('/', createAccount)
users.post('/password', auth, changePassword)

users.get('/account/logs', auth, getAccountLogs)
users.get('/account/info', auth, getAccountInfo)

users.get('/characters', auth, getCharacters)
users.post('/characters/main', auth, setMainCharacter)
users.post('/characters/change_name', auth, changeName)
users.post('/characters/change_class', auth, changeClass)

users.get('/chats', auth, requireMainCharacter, getChatGlobal)
users.get('/chats/dms/:character', auth, requireMainCharacter, getChatDMs)
users.get('/chats/recents', auth, requireMainCharacter, getChatRecents)
