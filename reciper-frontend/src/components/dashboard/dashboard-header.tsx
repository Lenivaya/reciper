import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function DashboardHeader() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center gap-4 space-y-0'>
        <Avatar className='h-16 w-16'>
          <AvatarImage alt='User avatar' />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold'>Welcome back!</h1>
          <p className='text-muted-foreground text-sm'>
            Manage your recipes and cooking activities
          </p>
        </div>
      </CardHeader>
    </Card>
  )
}
