import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

export const SocketIO = io(process.env.REACT_APP_WS_URL!, { withCredentials: true })

interface SocketState {}

const initialState: SocketState = {}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketTest() {
      SocketIO.emit('test line', 'wtf message :]')
    },
  },
})

export const { socketTest } = socketSlice.actions
export default socketSlice.reducer
