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
  const { data, fetching, error } = result

  if (fetching) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <div className='h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' />
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-[50vh] items-center justify-center'>
        <p className='text-destructive'>Failed to load settings</p>
      </div>
    )
  }

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
              <SettingsForm data={data?.me} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
