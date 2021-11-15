import { ICharacterClass } from './character'

export interface IChatRecent {
  name: string
  date: Date
  total_messages: number
  unseen: number
  class: ICharacterClass
  is_online: boolean
}

export interface IChatRecents {
  admins: IChatRecent[]
  list: IChatRecent[]
}

export interface IChatGlobal {
  id: number
  author: string
  message: string
  date: Date
}

export type IChatDM = IChatGlobal & {
  receiver: string
  seen: 0 | 1
}
