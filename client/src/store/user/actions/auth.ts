import { createAsyncThunk } from '@reduxjs/toolkit'
import { toast, ToastContentProps } from 'react-toastify'
import axios, { AxiosError } from 'axios'
import { IUser, UserLoginInput } from '../typings'

export const userLogin = createAsyncThunk('user/login', async ({ username, password }: UserLoginInput) => {
  const { data } = await toast.promise(
    axios.post<IUser>('/auth', {
      username,
      password,
    }),
    {
      pending: 'Login in progress...',
      error: {
        render({ data }: ToastContentProps<AxiosError<{ error: string }>>) {
          return data?.message === 'Network error'
            ? 'Something went wrong...'
            : data?.response?.data?.error || 'Something went wrong...'
        },
      },
      success: `Welcome back, ${username}!`,
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
