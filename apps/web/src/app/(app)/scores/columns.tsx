'use client'

import { RouterOutput } from '@gincana/trpc'
import { ColumnDef } from '@tanstack/react-table'

// import { format } from 'date-fns'
import { tableDataButton } from '@/components/TableDataButton'
import { roundIfDecimals } from '@/utils/round-if-decimals'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Team = RouterOutput['getTeams']['teams'][0]
export type Activity = RouterOutput['getActivities']['activities'][0]

type ColumnsProps = {
  activities: Activity[]
}

export const columns = ({ activities }: ColumnsProps): ColumnDef<Team>[] => [
  {
    accessorKey: 'name',
    header: tableDataButton('Nome da equipe'),
  },
  ...activities.map((activity) => ({
    accessorKey: `activity-${activity.id}`,
    header: tableDataButton(activity.title),
    cell: ({ row }) => {
      const score =
        row.original.scores.find((s) => s.activityId === activity.id)?.value ??
        '-'

      if (score === '-') {
        return <span>{score}</span>
      }

      return <span>{roundIfDecimals(score, 2)}</span>
    },
  })),
  // {
  //   accessorKey: 'createdAt',
  //   header: 'Criado em',
  //   cell: ({ row }) => {
  //     return (
  //       <span>
  //         {format(new Date(row.getValue('createdAt')), 'dd/MM/yyyy HH:mm')}
  //       </span>
  //     )
  //   },
  // },
]
