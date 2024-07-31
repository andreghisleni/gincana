import { redirect, RedirectType } from 'next/navigation'

export default async function ActivityPage() {
  redirect(
    '/activity/936eaf48-7aa5-4a4b-9d84-d63759708c18',
    RedirectType.replace,
  )
}
