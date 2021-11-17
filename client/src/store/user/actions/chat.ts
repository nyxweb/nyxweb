import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IChatGlobal, IChatDM, IChatRecents } from 'typings'

export const getChatRecents = createAsyncThunk('user/chat/recent', async () => {
  const { data } = await axios.get<IChatRecents>('/users/chats/recents')
  return data
})

export const getChatGlobal = createAsyncThunk('user/chat/getGlobal', async () => {
  const { data } = await axios.get<Record<string, IChatGlobal[]>>('/users/chats')
  return data
})

export const getChatDMs = createAsyncThunk('user/chat/getDMs', async (character: string) => {
  const { data } = await axios.get<Record<string, IChatDM[]>>(`/users/chats/dms`, { params: { character } })
  return { character, dms: data }
})
