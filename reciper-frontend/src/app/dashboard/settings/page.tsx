'use client'

import {
  SettingsForm,
  UpdateUserFragment
} from '@/components/forms/settings/settings-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { graphql } from 'gql.tada'
import { useQuery } from 'urql'

const GetUserQuery = graphql(
  `
    query GetUser {
      me {
        ...UpdateUserFragment
      }
    }
  `,
  [UpdateUserFragment]
)

export default function SettingsPage() {
  const [result] = useQuery({ query: GetUserQuery })

  const data = result.data?.me

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>Settings</h2>
        <p className='text-sm text-muted-foreground'>
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue='general' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='general'>General</TabsTrigger>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='notifications'>Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value='general' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <SettingsForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
