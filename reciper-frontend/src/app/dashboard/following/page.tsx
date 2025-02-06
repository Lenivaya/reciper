import { DashboardFollowers } from '@/components/dashboard/dashboard-followers'
import { DashboardFollowing } from '@/components/dashboard/dashboard-followings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FollowingPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-semibold tracking-tight'>My Network</h2>
        <p className='text-muted-foreground text-sm'>
          Manage your cooking network connections
        </p>
      </div>

      <Tabs defaultValue='following' className='space-y-6'>
        <div className='flex justify-center'>
          <TabsList>
            <TabsTrigger value='following'>Following</TabsTrigger>
            <TabsTrigger value='followers'>Followers</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='following' className='space-y-6'>
          <DashboardFollowing />
        </TabsContent>

        <TabsContent value='followers' className='space-y-6'>
          <DashboardFollowers />
        </TabsContent>
      </Tabs>
    </div>
  )
}
