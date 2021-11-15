import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IChatGlobal, IChatRecents } from 'typings'

export const getChatRecents = createAsyncThunk('user/chat/recent', async () => {
  const { data } = await axios.get<IChatRecents>('/users/chats/recents')
  return data
})

export const getChatGlobal = createAsyncThunk('user/chat/getGlobal', async () => {
  const { data } = await axios.get<Record<string, IChatGlobal[]>>('/users/chats')
  return data
})
