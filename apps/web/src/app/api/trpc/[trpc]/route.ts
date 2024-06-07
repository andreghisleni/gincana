import { auth } from '@gincana/auth'
import { env } from '@gincana/env'
import { appRouter } from '@gincana/trpc'
import { Handlers } from '@highlight-run/node'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextRequest, NextResponse } from 'next/server'

const handler = async (req: NextRequest) => {
  try {
    const response = await fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: async () => {
        const session = await auth()

        return {
          session,
        }
      },
      // onError: ({ error }) => {
      //   console.error('Error:', error)

      //   if (error.code === 'INTERNAL_SERVER_ERROR') {
      //     // TODO: send to bug reporting
      //   }
      // },

      onError: ({ error, req }) => {
        // ... your own error handling logic here
        console.log('error here', error)

        Handlers.trpcOnError(
          { error, req: req as any }, // eslint-disable-line @typescript-eslint/no-explicit-any
          {
            projectID: env.HIGHLIGHT_PROJECT_ID,
            serviceName: 'gincana-trpc-app',
            environment: env.NODE_ENV,
          },
        )
      },
    })

    return new NextResponse(response.body, {
      headers: response.headers,
      status: response.status,
      statusText: response.statusText,
    })
  } catch (err) {
    console.error(err)
  }
}

// export const runtime = 'edge'
// export const preferredRegion = 'cle1'
export { handler as GET, handler as POST }
