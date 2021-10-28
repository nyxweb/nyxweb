export interface User {
  username: string
  email: string
  created_at: string
  bloc_code: string
  ctl1_code: string
  is_vip: number
  vip_expiration: number
}

export interface SocketUser {
  id: string
  ip?: string
  user: User
}
