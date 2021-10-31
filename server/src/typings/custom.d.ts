import { Secret } from 'jsonwebtoken'
import { User } from 'typings'

declare module 'express' {
  export interface Request {
    user?: User
  }
}

declare module 'jsonwebtoken' {
  export function verify(token: string, secretOrPublicKey: Secret): User
}
