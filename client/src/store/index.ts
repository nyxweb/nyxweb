import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userSlice from './user'

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export * from './hooks'
