import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

export const SocketIO = io(process.env.REACT_APP_WS_URL!, { withCredentials: true })

interface SocketState {}

const initialState: SocketState = {}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {},
})

export default socketSlice.reducer
