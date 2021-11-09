import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ICharacter, IHOFCharacter, IGuild } from './typings'

export const getHOF = createAsyncThunk('ranking/hof', async () => {
  const { data } = await axios.get<IHOFCharacter[]>('/characters/hof')
  return data
})

export const getCharacter = createAsyncThunk('ranking/character', async ({ name }: { name: string }) => {
  const { data } = await axios.get<ICharacter>(`/characters/${name}`)
  return data
})

export const getCharacters = createAsyncThunk('ranking/characters', async () => {
  const { data } = await axios.get<ICharacter[]>(`/characters`)
  return data
})

export const getGuildsTop5 = createAsyncThunk('ranking/guilds_top5', async () => {
  const { data } = await axios.get<IGuild[]>(`/guilds`, { params: { top: 5 } })
  return data
})
