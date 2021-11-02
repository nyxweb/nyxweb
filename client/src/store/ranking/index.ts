import { createSlice } from '@reduxjs/toolkit'
import { RankingState } from './typings'
import { getCharacter, getHOF } from './actions'

const initialState: RankingState = {
  hof: {
    characters: null,
    loading: true,
  },
  character: {
    data: null,
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

      .addCase(getCharacter.pending, (state) => {
        state.character.loading = true
      })
      .addCase(getCharacter.fulfilled, (state, { payload }) => {
        state.character.data = payload
        state.character.loading = false
      })
      .addCase(getCharacter.rejected, (state) => {
        state.character.data = null
        state.character.loading = false
      })
  },
})

export default rankingSlice.reducer
export * from './typings'
export * from './actions'
