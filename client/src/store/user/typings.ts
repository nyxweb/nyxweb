export interface User {
  username: string
  email: string
  created_at: string
  bloc_code: string
  ctl1_code: string
  is_vip: 0 | 1
  vip_expiration: number
  storage: string
  zen: number
  credits: number
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

export interface UserState {
  user: User | null
  authorized: 'loading' | boolean
  loginStatus?: 'loading' | 'failed' | 'succeeded'
}

export interface UserLoginInput {
  username: string
  password: string
}
