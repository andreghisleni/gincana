import { NavLink, NavLinkProps } from '@/components/nav-link'

export function AsideLink(props: NavLinkProps) {
  return (
    <NavLink
      shouldMatchExact
      className="inline-flex h-9 items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring data-[current=true]:bg-muted dark:hover:bg-accent dark:data-[current=true]:bg-accent"
      {...props}
    />
  )
}
