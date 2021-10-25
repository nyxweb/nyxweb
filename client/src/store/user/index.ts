import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './typings'
import { userLogin, userVerify } from './actions/auth'

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
        state.user = payload.user
        state.authorized = true
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
  },
})

// export const { login } = userSlice.actions
export default userSlice.reducer
export * from './typings'
export * from './actions'
