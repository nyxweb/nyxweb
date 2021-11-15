import { ICharacter, IGuild, IHOFCharacter } from 'typings'

export interface RankingState {
  hof: {
    characters: IHOFCharacter[] | null
    loading: boolean
  }
  character: {
    data: ICharacter | null
    loading: boolean
  }
  characters: {
    data: ICharacter[] | null
    loading: boolean
  }
  guilds_top5: {
    data: IGuild[] | null
    loading: boolean
  }
}
