export interface User {
  username: string
  email: string
  created_at: string
  bloc_code: string
  ctl1_code: string
  is_vip: 0 | 1
  vip_expiration: number
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
