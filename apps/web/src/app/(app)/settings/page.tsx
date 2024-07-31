import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Settings } from './Settings'

export default async function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Update application settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Settings />
      </CardContent>
    </Card>
  )
}
