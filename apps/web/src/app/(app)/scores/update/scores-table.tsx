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

import { Activity, Team } from '../columns'
import { formatMillisecondsToSeconds } from '@/utils/format-miliseconds-to-seconds-and-minutes'
import { UpdateDialog } from './update-dialog'
import { trpc } from '@/lib/trpc/react'
import { ShowJson } from '@/components/show-json'

type IProps = {
  teams: Team[]
  activities: Activity[]
}

export const ScoresTable: React.FC<IProps> = ({ teams, activities }) => {
  const { data, refetch } = trpc.getTeams.useQuery();

  const d = data?.teams ? data.teams : teams;
    
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pontuação por atividade e equipe EDIÇÃO</CardTitle>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {d.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                {activities.map((activity) => {
                  const s = team.scores.find((s) => s.activityId === activity.id);
                  const score = s?.value ?? '-';

                  return (
                    <TableCell
                      key={`${team.id}-${activity.id}`}
                      className="text-center"
                    >
                      {score === '-' ? score : (
                        <UpdateDialog
                        team={team}
                        activity={activity}
                        refetch={async () => {await refetch()}}
                        value={score}
                        scoreId={s?.id || ''}
                      >
                        {activity.scoreType === 'TIME' ?
                          formatMillisecondsToSeconds(score) :
                          roundIfDecimals(score, 2)
                        }
                      </UpdateDialog>
                    )}
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
