'use client'

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

import { Activity, Team } from './columns'

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
              <TableHead className="w-[100px] text-center">N Reports</TableHead>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell className="text-center">
                  {team.reports.length}
                </TableCell>
                {activities.map((activity) => {
                  const score =
                    team.scores.find((s) => s.activityId === activity.id)
                      ?.value ?? '-'

                  return (
                    <TableCell
                      key={`${team.id}-${activity.id}`}
                      className="text-center"
                    >
                      {score === '-' ? score : roundIfDecimals(score, 2)}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
