import './next-auth-extend.d'

import NextAuth from 'next-auth'
import { SessionProvider, signIn as signInR, useSession } from 'next-auth/react'

import { authConfig } from './auth.config'

export type { Session, User, AuthError } from 'next-auth'

export const {
  auth,
  signIn,
  signOut,
  unstable_update: update,
  handlers,
} = NextAuth(authConfig)

export const signInReact = signInR

export { SessionProvider, useSession }
