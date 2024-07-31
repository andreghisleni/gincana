'use client'

import { format } from 'date-fns'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { roundIfDecimals } from '@/utils/round-if-decimals'

import { Activity } from './columns'
import { NScore } from './process-scores'

type Report = {
  id: string
  motiveId: string
}

type Team = {
  id: string
  name: string
  scores: NScore[]
  totalPoints: number
  reports: Report[]
}

type IProps = {
  teams: Team[]
  activities: Activity[]
  title: string
}

export const ScoresTable: React.FC<IProps> = ({ teams, activities, title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nome da equipe</TableHead>
              {activities.map((activity) => {
                if (activity.number) {
                  return (
                    <TableHead
                      key={activity.id}
                      className="group relative text-center"
                    >
                      {activity.number}

                      <span className="absolute -left-8 top-8 hidden w-auto rounded bg-black p-2 text-center text-white transition-opacity duration-300 group-hover:block">
                        {activity.title}
                      </span>
                    </TableHead>
                  )
                }

                return (
                  <TableHead key={activity.id} className="text-center">
                    {activity.title}
                  </TableHead>
                )
              })}
              <TableHead className="w-[100px] text-center">
                Total Points
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                {activities.map((activity) => {
                  const v = team.scores.find(
                    (s) => s.activityId === activity.id,
                  )

                  if (!v) {
                    return (
                      <TableCell
                        key={`${team.id}-${activity.id}`}
                        className="text-center"
                      >
                        -
                      </TableCell>
                    )
                  }

                  const { value, nv } = v as unknown as {
                    value: number
                    nv?: number
                  }

                  const score: string | number = value ?? '-'

                  // if (activity.scoreType === 'TIME') {
                  //   return (
                  //     <TableCell
                  //       key={`${team.id}-${activity.id}`}
                  //       className="text-center"
                  //     >
                  //       {score === '-'
                  //         ? score
                  //         : format(score || 0, 'mm:ss.SSS')}
                  //     </TableCell>
                  //   )
                  // }

                  return (
                    <TableCell
                      key={`${team.id}-${activity.id}`}
                      className="group relative text-center"
                    >
                      {!score ? '-' : nv || roundIfDecimals(score, 2)}

                      {!!nv && (
                        <span className="absolute -left-0.5 top-8 hidden w-auto rounded bg-black p-2 text-center text-white transition-opacity duration-300 group-hover:block">
                          {activity.scoreType === 'TIME'
                            ? format(score || 0, 'mm:ss.SSS')
                            : score}
                        </span>
                      )}
                    </TableCell>
                  )
                })}
                <TableCell className="text-center">
                  {team.totalPoints ?? '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
