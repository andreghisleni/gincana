export { auth as middleware } from '@gincana/auth'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|teste).*)',
    // '/api/inngest/.*',
  ],
}
