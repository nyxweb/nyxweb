import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Character, HOFCharacter } from '.'

export const getHOF = createAsyncThunk('ranking/hof', async () => {
  const { data } = await axios.get<HOFCharacter[]>('/characters/hof')
  return data
})

export const getCharacter = createAsyncThunk('ranking/character', async ({ name }: { name: string }) => {
  const { data } = await axios.get<Character>(`/characters/${name}`)
  return data
})
