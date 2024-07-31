import { auth } from '@gincana/auth'

import { ThemeSwitcher } from './theme-switcher'
import { UserProfileButton } from './user-profile-button'

export async function OtherHeader() {
  const session = await auth()

  if (!session) {
    return null
  }

  return (
    <div className="border-b">
      <div className="flex h-[3rem] items-center justify-between px-8 sm:hidden ">
        <div className="flex w-auto items-center space-x-4 overflow-x-auto">
          <h1 className="text-xl">Gincana</h1>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <UserProfileButton />
        </div>
      </div>
    </div>
  )
}
