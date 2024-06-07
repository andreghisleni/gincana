import { Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import React, { ReactNode } from 'react'

import { Button } from './ui/button'

// import { Container } from './styles';

export const TableDataButton: React.FC<{
  column: Column<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  children: ReactNode
}> = ({ column, children }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      data-text={children}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

export const tableDataButton =
  (label: string) =>
  ({ column }: {column: Column<any>}) => <TableDataButton column={column}>{label}</TableDataButton>// eslint-disable-line
