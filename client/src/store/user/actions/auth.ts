import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axios from 'axios'
import { UserLoginInput } from '../typings'
import { IUser, ToastError } from 'typings'

export const userLogin = createAsyncThunk('user/login', async ({ username, password }: UserLoginInput) => {
  const { data } = await toast.promise(
    axios.post<IUser>('/auth', {
      username,
      password,
    }),
    {
      pending: 'Login in progress...',
      success: `Welcome back, ${username}!`,
      error: {
        render({ data }: ToastError) {
          return data?.response?.data?.error || data?.message
        },
      },
    },
  )

  return data
})

export const userVerify = createAsyncThunk('user/verify', async () => {
  const { data } = await axios.get<IUser>('/auth')
  return data
})

export const userLogout = createAsyncThunk('user/logout', async () => {
  await axios.delete('/auth')
})
