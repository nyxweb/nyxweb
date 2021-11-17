import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ICharacterClass, ICharacterPrivate, ToastError } from 'typings'
import { getClassInfo } from 'utils'

export const getCharacters = createAsyncThunk('user/character/get', async () => {
  const { data } = await axios.get<ICharacterPrivate[]>('/users/characters')
  return data
})

export const characterSetMain = createAsyncThunk(
  'user/character/setMain',
  async ({ character }: { character: string }) => {
    await toast.promise(axios.post('/users/characters/main', { character }), {
      pending: 'Setting main character...',
      success: `Main character has been set!`,
      error: {
        render({ data }: ToastError) {
          return data?.response?.data?.error || data?.message
        },
      },
    })

    return { character }
  },
)

interface ChangeNameInput {
  character: string
  newName: string
}

export const characterChangeName = createAsyncThunk(
  'user/character/changeName',
  async ({ character, newName }: ChangeNameInput) => {
    await toast.promise(axios.post('/users/characters/change_name', { character, newName }), {
      pending: 'Changing character name...',
      success: `${character}'s name has been changed to ${newName}!`,
      error: {
        render({ data }: ToastError) {
          return data?.response?.data?.error || data?.message
        },
      },
    })

    return { character, newName }
  },
)

interface ChangeClassInput {
  character: string
  newClass: ICharacterClass
}

export const characterChangeClass = createAsyncThunk(
  'user/character/changeClass',
  async ({ character, newClass }: ChangeClassInput) => {
    const classInfo = getClassInfo(newClass)

    await toast.promise(axios.post('/users/characters/change_class', { character, newClass }), {
      pending: 'Changing character class...',
      success: `${character} is now a ${classInfo.className.long}!`,
      error: {
        render({ data }: ToastError) {
          return data?.response?.data?.error || data?.message
        },
      },
    })

    return { character, newClass }
  },
)
