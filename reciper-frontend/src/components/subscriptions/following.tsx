import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { FC, Key } from 'react'

export const FollowingFragment = graphql(`
  fragment FollowingFragment on UserSubscription {
    id
    subscriberId
    subscribeeId
    subscribee {
      id
      username
      recipesCount
      profilePictureUrl
    }
  }
`)

export interface IFollowingProps {
  data: FragmentOf<typeof FollowingFragment>
}

export const Following: FC<IFollowingProps> = ({ data }) => {
  const following = readFragment(FollowingFragment, data)

  return (
    <Card key={following.id as Key} className='p-6'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-10 w-10'>
          <AvatarImage alt={following.subscribee.username} />
          <AvatarFallback>{following.subscribee.username[0]}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <h3 className='font-medium'>{following.subscribee.username}</h3>
          <p className='text-muted-foreground text-sm'>
            {following.subscribee.recipesCount} recipes
          </p>
        </div>
        <Button variant='secondary' size='sm'>
          Following
        </Button>
      </div>
    </Card>
  )
}
