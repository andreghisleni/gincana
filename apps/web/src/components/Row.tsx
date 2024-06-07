import React from 'react'

import { cn } from '@/lib/utils'

export type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

const Row = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('w-full gap-4 md:flex', className)}
        ref={ref}
        {...props}
      />
    )
  },
)
Row.displayName = 'Row'

export { Row }
