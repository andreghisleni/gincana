import { prisma } from '@gincana/prisma'
import { compare } from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'

export const credentialsProvider = CredentialsProvider({
  name: 'credentials',

  credentials: {
    userName: {
      label: 'UserName',
      type: 'text',
      placeholder: 'use admin',
      value: 'admin',
    },
    password: {
      label: 'Password',
      type: 'password',
      value: 'admin',
      placeholder: 'use 123456',
    },
  },
  async authorize(credentials) {
    if (!credentials.userName || !credentials.password) {
      return null
    }

    const userExists = await prisma.user.findFirst({
      where: {
        userName: credentials.userName,
      },
      include: {
        Activity: true,
      },
    })

    if (!userExists) {
      return null
    }

    const passwordMatch = await compare(
      credentials.password as string,
      userExists.passwordHash,
    )

    if (!passwordMatch) {
      return null
    }

    return {
      id: userExists.id,
      userName: userExists.userName,
      name: userExists.name,
      image: userExists.image,
      activityId: userExists.Activity?.id || null,
    }
  },
})
