import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { FC, Key, useCallback } from 'react'
import { useMutation } from 'urql'

export const FollowerFragment = graphql(`
  fragment FollowerFragment on UserSubscription {
    id
    subscriberId
    subscribeeId
    subscriber {
      id
      username
      recipesCount
      profilePictureUrl
      isSubscribed
    }
  }
`)

export interface IFollowerProps {
  data: FragmentOf<typeof FollowerFragment>
}

export const MutationUnsubscribeFromUserMutation = graphql(`
  mutation UnsubscribeFromUserMutation($userId: UUID!) {
    unsubscribe(input: { userId: $userId }) {
      errors {
        ... on ReciperError {
          message
        }
      }
      userSubscription {
        id
      }
    }
  }
`)

export const MutationSubscribeToUserMutation = graphql(`
  mutation SubscribeToUserMutation($userId: UUID!) {
    subscribe(input: { subscribeeId: $userId }) {
      errors {
        ... on ReciperError {
          message
        }
      }
      userSubscription {
        id
      }
    }
  }
`)

export const Follower: FC<IFollowerProps> = ({ data }) => {
  const follower = readFragment(FollowerFragment, data)

  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_result, unsubscribe] = useMutation(
    MutationUnsubscribeFromUserMutation
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_subscribeResult, subscribe] = useMutation(
    MutationSubscribeToUserMutation
  )

  const handleSubscribe = useCallback(async () => {
    const result = await subscribe({ userId: follower.subscriberId })
    if (result.error) {
      toast({
        title: 'Error',
        description: 'An error occurred while subscribing'
      })
    }
  }, [follower.subscriberId, toast, subscribe])

  const handleUnsubscribe = useCallback(async () => {
    const result = await unsubscribe({ userId: follower.subscriberId })
    if (result.error) {
      toast({
        title: 'Error',
        description: 'An error occurred while unsubscribing'
      })
    }
  }, [follower.subscriberId, toast, unsubscribe])

  const handleButtonClick = useCallback(async () => {
    if (follower.subscriber.isSubscribed) {
      await handleUnsubscribe()
    } else {
      await handleSubscribe()
    }
  }, [follower.subscriber.isSubscribed, handleSubscribe, handleUnsubscribe])

  return (
    <Card key={follower.id as Key} className='p-6'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-10 w-10'>
          <AvatarImage alt={follower.subscriber.username} />
          <AvatarFallback>{follower.subscriber.username[0]}</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
          <h3 className='font-medium'>{follower.subscriber.username}</h3>
          <p className='text-muted-foreground text-sm'>
            {follower.subscriber.recipesCount} recipes
          </p>
        </div>
        <Button
          onClick={handleButtonClick}
          variant={follower.subscriber.isSubscribed ? 'outline' : 'default'}
          size='sm'
        >
          {follower.subscriber.isSubscribed ? 'Following' : 'Follow Back'}
        </Button>
      </div>
    </Card>
  )
}
