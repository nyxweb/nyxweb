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
        state.hof.characters = [{ class: 17, date: '2021-10-01', level: 333, name: 'Patrick', rank: 1, reset: 2 }]
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
