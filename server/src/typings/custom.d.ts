import { MEMB_INFO } from 'db/entity'
import { Secret, JwtPayload } from 'jsonwebtoken'

export interface IUser {
  memb___id: string
  mail_addr: string | null
  appl_days: Date | null
  bloc_code: string
  ctl1_code: string
  IsVip: number
  VipExpirationTime: number
}

declare module 'express' {
  export interface Request {
    user?: IUser
  }
}

declare module 'jsonwebtoken' {
  export function verify(token: string, secretOrPublicKey: Secret): { account: string } & JwtPayload
}
