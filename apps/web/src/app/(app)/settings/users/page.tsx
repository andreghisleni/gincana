import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

import { serverClient } from '@/lib/trpc/server'

import { UsersTable } from './user-table'

export const metadata: Metadata = {
  title: 'Usuários',
}

export default async function UserPage() {
  unstable_noStore()

  const { users } = await serverClient.getUsers()

  return <UsersTable users={users} />
}
