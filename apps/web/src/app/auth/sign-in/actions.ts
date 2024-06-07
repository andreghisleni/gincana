'use server'

import { AuthError, signIn } from '@gincana/auth'
import { z } from 'zod'

export const signInFormSchema = z.object({
  email: z.string().email({ message: 'Use admin@rocketseat.team' }),
  password: z.string().min(1, { message: 'Use 123456' }),
})

export async function signInWithEmail(data: FormData) {
  'use server'
  const { email, password } = signInFormSchema.parse(Object.fromEntries(data))

  // try {
  const response = await signIn('credentials', {
    email,
    password,
    redirectTo: '/dashboard',
  })

  // return response
  console.log(response)
  // } catch (error) {
  //   // console.log('kkkkk', error)
  //   console.log('singing error')
  // }
}

export async function signInWithGithub() {
  await signIn('google', {
    redirectTo: '/dashboard',
  })
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    const success = await signIn('credentials', formData)
    console.log({ prevState, success })
    return undefined
  } catch (error) {
    console.log({ error })
    if (error instanceof Error) {
      const { type, cause } = error as AuthError
      switch (type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        case 'CallbackRouteError':
          return cause?.err?.toString()
        default:
          return 'Something went wrong.'
      }
    }

    throw error
  }
}
