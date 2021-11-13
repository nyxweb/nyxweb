export interface IResources {
  storage: string
  zen: string
  gold: string
  chaos: number
  bless: number
  soul: number
  life: number
  creation: number
  rena: number
  stone: number
  boh: number
  box1: number
  box2: number
  box3: number
  box4: number
  box5: number
  heart: number
}

export interface IUser {
  memb___id: string
  mail_addr: string
  appl_days: string
  bloc_code: string
  ctl1_code: string
  IsVip: 0 | 1
  VipExpirationTime: number
  resources: IResources
}

export interface UserState {
  user: IUser | null
  authorized: 'loading' | boolean
  loginStatus?: 'loading' | 'failed' | 'succeeded'
}

export interface UserLoginInput {
  username: string
  password: string
}
