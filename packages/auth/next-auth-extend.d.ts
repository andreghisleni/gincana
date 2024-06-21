import type { AdapterUser as AdapterUserBase } from '@auth/core/adapters'
import type { DefaultSession, User as DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

import type { UserTypes } from '.'

declare module '@auth/core/adapters' {
  export interface AdapterUser extends AdapterUserBase {
    activityId: string | null
    type: UserTypes
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    activityId: string | null
    type: UserTypes
  }

  export interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    activityId: string | null
    type: UserTypes
  }
}
