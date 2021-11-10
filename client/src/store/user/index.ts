import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './typings'
import { userLogin, userLogout, userVerify } from './actions/auth'
import { SocketIO } from '../socket'

const initialState: UserState = {
  user: null,
  authorized: 'loading',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loginStatus = 'loading'
      })
      .addCase(userLogin.rejected, (state) => {
        state.loginStatus = 'failed'
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loginStatus = 'succeeded'
        state.user = payload
        state.authorized = true
        SocketIO.disconnect()
        SocketIO.connect()
      })

      .addCase(userVerify.pending, (state) => {
        state.authorized = 'loading'
      })
      .addCase(userVerify.rejected, (state) => {
        state.authorized = false
      })
      .addCase(userVerify.fulfilled, (state, { payload }) => {
        state.user = payload
        state.authorized = true
      })

      .addCase(userLogout.fulfilled, (state) => {
        state.user = null
        state.authorized = false
      })
  },
})

export default userSlice.reducer
export * from './typings'
export * from './actions'
