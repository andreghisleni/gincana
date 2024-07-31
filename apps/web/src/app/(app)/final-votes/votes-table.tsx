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
  totalVotes: number
}

type IProps = {
  teams: Team[]
}

export const VotesTable: React.FC<IProps> = ({ teams }) => {
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

              <TableHead className="text-center">Total de votos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell className="text-center">
                  {team.totalVotes ?? '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
