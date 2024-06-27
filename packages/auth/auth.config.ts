import type { NextAuthConfig, Session } from 'next-auth'

import { credentialsProvider } from './credentials-provider'

export const authConfig = {
  // adapter: PrismaAdapter(prisma), // eslint-disable-line
  providers: [credentialsProvider],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'credentials') {
        console.log('credentials', account, profile)

        return true
      }

      return false
    },
    jwt({ token, user, session, trigger }) {
      if (user) {
        token.activityId = user.activityId
        token.type = user.type
      }

      function isSessionAvailable(session: unknown): session is Session {
        return !!session
      }

      if (trigger === 'update' && isSessionAvailable(session)) {
        console.log('session', session)
        console.log('token', token)
        token.name = session.user.name
        token = {
          ...token,
          activityId: session.user.activityId,
          type: session.user.type,
          user: session,
        }
      }

      return token
    },
    session({ session, ...params }) {
      if ('token' in params && session.user) {
        session.user.activityId = params.token.activityId
        session.user.type = params.token.type
        session.user.id = params.token.sub!
      }

      return session
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdmin = auth?.user?.type === 'ADMIN'
      const isActivity = auth?.user?.type === 'ACTIVITY'
      const isDefault = auth?.user?.type === 'DEFAULT'
      const activityId = auth?.user?.activityId

      const isOnPublicPages = nextUrl.pathname.startsWith('/auth')
      const isOnWebhooks = nextUrl.pathname.startsWith('/api/webhooks')
      const isOnPublicAPIRoutes = nextUrl.pathname.startsWith('/api/auth')
      const isOnAPIRoutes = nextUrl.pathname.startsWith('/api')
      const isOnPrivatePages = !isOnPublicPages
      // const isOnOnboarding = nextUrl.pathname.startsWith('/onboarding')
      const isOnPointDiscountPage =
        nextUrl.pathname.startsWith('/point-discount')
      const isOnActivityPage = nextUrl.pathname.startsWith('/activity')
      const isOnVotePage = nextUrl.pathname.startsWith('/vote')

      const isOnPublicPage =
        nextUrl.pathname.startsWith('/p/') ||
        nextUrl.pathname.startsWith('/404')

      if (isOnPublicPage) {
        return true
      }

      if (isOnWebhooks || isOnPublicAPIRoutes) {
        return true
      }
      // console.log('nextUrl', nextUrl)

      if (isOnPublicPages && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      if (isOnAPIRoutes && !isLoggedIn) {
        return Response.json({ message: 'Unauthorized.' }, { status: 401 })
      }

      if (isOnPrivatePages && !isLoggedIn) {
        return false
      }

      if (isDefault && !(isOnPointDiscountPage || isOnVotePage)) {
        return Response.redirect(new URL('/point-discount', nextUrl))
      }

      if (
        isActivity &&
        !(isOnActivityPage || isOnPointDiscountPage || isOnVotePage)
      ) {
        return Response.redirect(new URL(`/activity/${activityId}`, nextUrl))
      }

      console.log('here', {
        isActivity,
        isDefault,
        activityId,
        isOnPointDiscountPage,
        isOnActivityPage,
        isOnVotePage,
        type: auth?.user?.type,
      })

      // if (
      //   isLoggedIn &&
      //   isOnPrivatePages &&
      //   !auth?.user?.activityId &&
      //   !isOnOnboarding
      // ) {
      //   return Response.redirect(new URL('/onboarding', nextUrl))
      // }

      return true
    },
  },
} satisfies NextAuthConfig
