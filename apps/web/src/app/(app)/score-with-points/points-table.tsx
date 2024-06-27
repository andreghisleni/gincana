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

type Team = {
  id: string
  name: string
  totalPoints: number
  totalReportPoints: number
}

type IProps = {
  teams: Team[]
}

export const PointsTable: React.FC<IProps> = ({ teams }) => {
  const teamsWithTotal = teams
    .map((team) => ({
      ...team,
      total: team.totalPoints - team.totalReportPoints,
    }))
    .sort((a, b) => b.total - a.total)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tabela com a pontuação final</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nome da equipe</TableHead>

              <TableHead className="text-center">
                Total de pontos das tarefas
              </TableHead>
              <TableHead className="text-center">
                Total de pontos das denuncias
              </TableHead>
              <TableHead className="text-center">Total de pontos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamsWithTotal.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell className="text-center">
                  {team.totalPoints ?? '-'}
                </TableCell>
                <TableCell className="text-center">
                  {team.totalReportPoints ?? '-'}
                </TableCell>
                <TableCell className="text-center">
                  {team.total ?? '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
