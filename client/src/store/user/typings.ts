import { ICharacterPrivate, IChatDM, IChatGlobal, IChatRecents, IUser } from 'typings'

export interface UserState {
  authorized: 'loading' | boolean
  loginStatus?: 'loading' | 'failed' | 'succeeded'
  user: IUser | null
  characters: {
    data: ICharacterPrivate[] | null
    loading: boolean
  }
  chat: {
    recents: IChatRecents | null
    chats: {
      global: Record<string, IChatGlobal[]> | null
      dms: Record<string, Record<string, IChatDM[]>> | null
    }
  }
}

export interface UserLoginInput {
  username: string
  password: string
}
