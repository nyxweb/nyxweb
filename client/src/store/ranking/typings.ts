export interface IHOFCharacter {
  name: string
  reset: number
  level: number
  class: number
  date: string
  rank: number
}

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

export interface IGuild {
  G_Name: string
  G_Mark: string
  G_Score: number
  G_Master: string
  levels: number
  members: number
}

export interface IGuildMember {
  G_Name: string
  G_Status: 0 | 32 | 64 | 128
  guild: IGuild
}

export interface IMEMB_STAT {
  ConnectStat: 0 | 1
  ConnectTM: Date
  DisConnectTM: Date
}

export type ICharacterClass = 0 | 1 | 16 | 17 | 32 | 33 | 48 | 64

export interface ICharacter {
  Name: string
  cLevel: number
  Class: ICharacterClass
  Inventory: string
  Money: number
  MapNumber: number
  PkCount: number
  ChatLimitTime: number
  Resets: number
  BanPost: number
  IsMarried: number
  MarryName: string | null
  QuestInProgress: number
  QuestNumber: number
  QuestMonsters: number
  SkyEventWins: number
  IsVip: number
  VipExpirationTime: number
  total_stats: number
  member: IGuildMember | null
  memb_stat: IMEMB_STAT | null
}
