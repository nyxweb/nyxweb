import { createSlice } from '@reduxjs/toolkit'
import { RankingState } from './typings'
import { getHOF } from './actions'

const initialState: RankingState = {
  hof: {
    characters: null,
    loading: true,
  },
}

export const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getHOF.pending, (state) => {
        state.hof.loading = true
      })
      .addCase(getHOF.rejected, (state) => {
        state.hof.loading = false
        state.hof.characters = null
      })
      .addCase(getHOF.fulfilled, (state, { payload }) => {
        state.hof.loading = false
        state.hof.characters = payload
      })
  },
})

export default rankingSlice.reducer
export * from './typings'
export * from './actions'
