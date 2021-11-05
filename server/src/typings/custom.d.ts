import { MEMB_INFO } from 'db/entity'
import { Secret } from 'jsonwebtoken'

declare module 'express' {
  export interface Request {
    user?: MEMB_INFO
  }
}

declare module 'jsonwebtoken' {
  export function verify(token: string, secretOrPublicKey: Secret): MEMB_INFO
}
