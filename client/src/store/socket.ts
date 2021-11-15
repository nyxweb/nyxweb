import { createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

export const SocketIO = io(process.env.REACT_APP_WS_URL!, { withCredentials: true })

interface SocketState {}

const initialState: SocketState = {}

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    socketChatEmitGlobal(_state, { payload }) {
      SocketIO.emit('chat global message', payload)
    },
  },
})

export const { socketChatEmitGlobal } = socketSlice.actions
export default socketSlice.reducer
