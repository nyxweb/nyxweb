import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './typings'
import { SocketIO } from '../socket'
import { IChatDM, IChatGlobal } from 'typings'

import { userLogin, userLogout, userVerify } from './actions/auth'
import { getCharacters, characterSetMain, characterChangeName, characterChangeClass } from './actions/character'
import { getChatRecents, getChatGlobal, getChatDMs } from './actions/chat'

const initialState: UserState = {
  authorized: 'loading',
  user: null,
  characters: {
    data: null,
    loading: true,
  },
  chat: {
    recents: null,
    chats: {
      global: null,
      dms: null,
    },
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    emitChatGlobal(_state, { payload }) {
      SocketIO.emit('chat global message', payload)
    },
    emitChatDM(state, { payload }: PayloadAction<{ message: string; receiver: string; author: string }>) {
      const day = new Date().toISOString().substring(0, 10)
      const chat: IChatDM = { ...payload, date: new Date().toISOString(), seen: 0, id: 1 }

      SocketIO.emit('chat private message', { message: payload.message, character: payload.receiver })

      if (!state.chat.chats.dms) return
      if (!state.chat.chats.dms[payload.receiver]) state.chat.chats.dms[payload.receiver] = { [day]: [chat] }
      else {
        if (state.chat.chats.dms[payload.receiver][day]) state.chat.chats.dms[payload.receiver][day].push(chat)
        else state.chat.chats.dms[payload.receiver][day] = [chat]
      }
    },
    addChatGlobal(state, { payload }: PayloadAction<IChatGlobal>) {
      if (!state.chat.chats.global) return
      const day = new Date(payload.date).toISOString().substring(0, 10)

      if (state.chat.chats.global[day]) state.chat.chats.global[day].push(payload)
      else state.chat.chats.global[day] = [payload]
    },
    addChatDM(state, { payload }: PayloadAction<IChatDM>) {
      if (!state.chat.chats.dms) return
      const day = new Date(payload.date).toISOString().substring(0, 10)

      if (!state.chat.chats.dms[payload.author])
        state.chat.chats.dms[payload.author] = {
          [day]: [payload],
        }
      else {
        if (state.chat.chats.dms[payload.author][day]) state.chat.chats.dms[payload.author][day].push(payload)
        else state.chat.chats.dms[payload.author][day] = [payload]
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loginStatus = 'loading'
      })
      .addCase(userLogin.rejected, (state) => {
        state.loginStatus = 'failed'
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loginStatus = 'succeeded'
        state.user = payload
        state.authorized = true
        SocketIO.disconnect()
        SocketIO.connect()
      })

      .addCase(userVerify.pending, (state) => {
        state.authorized = 'loading'
      })
      .addCase(userVerify.rejected, (state) => {
        state.authorized = false
      })
      .addCase(userVerify.fulfilled, (state, { payload }) => {
        state.user = payload
        state.authorized = true
      })

      .addCase(userLogout.fulfilled, (state) => {
        state.user = null
        state.authorized = false
      })

      .addCase(getCharacters.pending, (state) => {
        state.characters.loading = true
      })
      .addCase(getCharacters.fulfilled, (state, { payload }) => {
        state.characters.data = payload
        state.characters.loading = false
      })
      .addCase(getCharacters.rejected, (state) => {
        state.characters.data = null
        state.characters.loading = false
      })

      .addCase(characterSetMain.fulfilled, (state, { payload }) => {
        if (state.user) state.user.main_character = payload.character
      })

      .addCase(characterChangeName.fulfilled, (state, { payload }) => {
        if (state.characters.data)
          state.characters.data = state.characters.data.map((char) => ({
            ...char,
            Name: char.Name === payload.character ? payload.newName : char.Name,
          }))

        if (state.user?.resources.gold) state.user.resources.gold = state.user.resources.gold - 500
      })

      .addCase(characterChangeClass.fulfilled, (state, { payload }) => {
        if (state.characters.data)
          state.characters.data = state.characters.data.map((char) => ({
            ...char,
            Class: char.Name === payload.character ? payload.newClass : char.Class,
          }))

        if (state.user?.resources.gold) state.user.resources.gold = state.user.resources.gold - 500
      })

      .addCase(getChatRecents.fulfilled, (state, { payload }) => {
        state.chat.recents = {
          admins: payload.admins.filter((admin) => admin.name !== state.user?.main_character),
          list: payload.list.filter((char) => char.name !== state.user?.main_character),
        }
      })

      .addCase(getChatGlobal.fulfilled, (state, { payload }) => {
        state.chat.chats.global = payload
      })

      .addCase(getChatDMs.fulfilled, (state, { payload }) => {
        state.chat.chats.dms = {
          ...(state.chat.chats.dms || {}),
          [payload.character]: payload.dms,
        }
      })
  },
})

export const { addChatGlobal, addChatDM, emitChatDM, emitChatGlobal } = userSlice.actions
export default userSlice.reducer
export * from './typings'
export * from './actions'
