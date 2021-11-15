import { IGuildMember } from './guild'
import { IMEMB_STAT } from './user'

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
  account_character: { GameIDC: string }
}

export interface IHOFCharacter {
  name: string
  reset: number
  level: number
  class: number
  date: string
  rank: number
}

export interface ICharacterPrivate {
  Name: string
  cLevel: number
  Strength: number
  Dexterity: number
  Vitality: number
  Energy: number
  Leadership: number
  LevelUpPoint: number
  Class: ICharacterClass
  account_character: { GameIDC: string }
  is_online: boolean
}
