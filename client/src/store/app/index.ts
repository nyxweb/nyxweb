import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './typings'

const initialState: AppState = {
  modal: {
    active: true,
    type: null,
  },
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setModal(state, { payload }: PayloadAction<AppState['modal']>) {
      state.modal = payload
    },
  },
})

export const { setModal } = appSlice.actions
export default appSlice.reducer
export * from './typings'
