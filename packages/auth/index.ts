import './next-auth-extend.d'

import NextAuth from 'next-auth'

import { authConfig } from './auth.config'

export type UserTypes = 'DEFAULT' | 'ACTIVITY' | 'ADMIN'

export type { Session, User, AuthError } from 'next-auth'

export const {
  auth,
  signIn,
  signOut,
  unstable_update: update,
  handlers,
} = NextAuth(authConfig)
