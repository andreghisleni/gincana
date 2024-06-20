import { NavLink, NavLinkProps } from '../nav-link'

export function MenuLink(props: NavLinkProps) {
  return (
    <NavLink
      className="flex h-14 items-center border-b-2 border-transparent px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border data-[current=true]:border-teal-400 data-[current=true]:text-accent-foreground"
      {...props}
    />
  )
}
