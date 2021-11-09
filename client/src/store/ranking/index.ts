import { createSlice } from '@reduxjs/toolkit'
import { RankingState } from './typings'
import { getCharacter, getCharacters, getHOF, getGuildsTop5 } from './actions'

const initialState: RankingState = {
  hof: {
    characters: null,
    loading: true,
  },
  character: {
    data: null,
    loading: true,
  },
  characters: {
    data: null,
    loading: true,
  },
  guilds_top5: {
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
        state.hof.characters = null
      })
      .addCase(getHOF.fulfilled, (state, { payload }) => {
        state.hof.loading = false
        state.hof.characters = payload
      })

      .addCase(getCharacter.pending, (state) => {
        state.character.loading = true
      })
      .addCase(getCharacter.rejected, (state) => {
        state.character.data = null
        state.character.loading = false
      })
      .addCase(getCharacter.fulfilled, (state, { payload }) => {
        state.character.data = payload
        state.character.loading = false
      })

      .addCase(getCharacters.pending, (state) => {
        state.characters.loading = true
      })
      .addCase(getCharacters.rejected, (state) => {
        state.characters.data = null
        state.characters.loading = false
      })
      .addCase(getCharacters.fulfilled, (state, { payload }) => {
        state.characters.data = payload
        state.characters.loading = false
      })

      .addCase(getGuildsTop5.pending, (state) => {
        state.guilds_top5.loading = true
      })
      .addCase(getGuildsTop5.rejected, (state) => {
        state.guilds_top5.data = null
        state.guilds_top5.loading = false
      })
      .addCase(getGuildsTop5.fulfilled, (state, { payload }) => {
        state.guilds_top5.data = payload
        state.guilds_top5.loading = false
      })
  },
})

export default rankingSlice.reducer
export * from './typings'
export * from './actions'
