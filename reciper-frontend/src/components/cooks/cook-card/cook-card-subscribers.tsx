'use client'

import { Button } from '@/components/ui/button'
import { useIsAuthTokenPresent } from '@/hooks/use-auth-token'
import { useToast } from '@/hooks/use-toast'
import { cn, isSome } from '@/lib/utils'
import { useMutation, useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { UserMinus, UserPlus, Users } from 'lucide-react'
import { FC, useCallback, useMemo, useRef, useState } from 'react'
import { match } from 'ts-pattern'
import { useHover } from 'usehooks-ts'

export const CookCardSubscribersFragment = graphql(`
  fragment CookCardSubscribersFragment on UserSubscription {
    id
  }
`)

export const GetCookCardSubscribersQuery = graphql(
  `
    query GetCookCardSubscribersQuery($userId: UUID!) {
      mySubscription(otherUserId: $userId) {
        ...CookCardSubscribersFragment
      }
    }
  `,
  [CookCardSubscribersFragment]
)

export const SubscribeToCookMutation = graphql(
  `
    mutation SubscribeToCook($userId: UUID!) {
      subscribe(input: { subscribeeId: $userId }) {
        userSubscription {
          ...CookCardSubscribersFragment
        }
      }
    }
  `,
  [CookCardSubscribersFragment]
)

export const UnsubscribeFromCookMutation = graphql(
  `
    mutation UnsubscribeFromCook($userId: UUID!) {
      unsubscribe(input: { userId: $userId }) {
        userSubscription {
          ...CookCardSubscribersFragment
        }
      }
    }
  `,
  [CookCardSubscribersFragment]
)

interface CookCardSubscribersProps {
  subscribersCount?: number
  cookId: string
}

type SubscriptionState = {
  type: 'idle' | 'hover'
  isSubscribed: boolean
}

export const CookCardSubscribers: FC<CookCardSubscribersProps> = ({
  subscribersCount = 0,
  cookId
}) => {
  const isAuthTokenPresent = useIsAuthTokenPresent()
  const { toast } = useToast()

  const [subscribers, setSubscribers] = useState(subscribersCount)

  const context = useMemo(
    () => ({ additionalTypenames: ['UserSubscription'] }),
    []
  )
  const [result] = useQuery({
    query: GetCookCardSubscribersQuery,
    context,
    variables: { userId: cookId },
    pause: !isAuthTokenPresent
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_subscribeResult, subscribe] = useMutation(SubscribeToCookMutation)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_unsubscribeResult, unsubscribe] = useMutation(
    UnsubscribeFromCookMutation
  )

  const isSubscribed = isSome(result.data?.mySubscription)

  const hoverRef = useRef<HTMLButtonElement>(null)
  // @ts-expect-error hoverRef is null when the component is not mounted
  const isHover = useHover(hoverRef)

  const state: SubscriptionState = {
    type: isHover ? 'hover' : 'idle',
    isSubscribed
  }

  const handleSubscribe = useCallback(async () => {
    const result = await subscribe({ userId: cookId })
    if (result.error) {
      toast({
        title: 'Error',
        description: 'An error occurred while subscribing'
      })
    }
    setSubscribers((subscribers) => subscribers + 1)
  }, [subscribe, cookId, toast])

  const handleUnsubscribe = useCallback(async () => {
    const result = await unsubscribe({ userId: cookId })
    if (result.error) {
      toast({
        title: 'Error',
        description: 'An error occurred while unsubscribing'
      })
    }
    setSubscribers((subscribers) => subscribers - 1)
  }, [unsubscribe, cookId, toast])

  const handleToggleSubscribe = useCallback(() => {
    if (!isAuthTokenPresent) {
      toast({ description: 'You must be logged in to subscribe' })
      return
    }

    if (isSubscribed) {
      handleUnsubscribe()
    } else {
      handleSubscribe()
    }
  }, [
    handleSubscribe,
    handleUnsubscribe,
    isAuthTokenPresent,
    isSubscribed,
    toast
  ])

  const { icon, text } = match(state)
    .with({ type: 'idle' }, () => ({
      icon: <Users className='h-4 w-4 shrink-0' />,
      text: `${subscribers} subscriber${subscribers !== 1 ? 's' : ''}`
    }))
    .with({ type: 'hover', isSubscribed: true }, () => ({
      icon: <UserMinus className='h-4 w-4 shrink-0' />,
      text: 'Unsubscribe'
    }))
    .with({ type: 'hover', isSubscribed: false }, () => ({
      icon: <UserPlus className='h-4 w-4 shrink-0' />,
      text: 'Subscribe'
    }))
    .exhaustive()

  return (
    <Button
      variant='ghost'
      ref={hoverRef}
      size='sm'
      className={cn(
        'group relative h-auto space-x-1.5 p-0 transition-all duration-300',
        'hover:-translate-y-0.5 hover:bg-transparent',
        isSubscribed ? 'text-primary' : 'hover:text-primary'
      )}
      onClick={handleToggleSubscribe}
    >
      <div className='relative'>
        {isSubscribed && (
          <span
            className={cn(
              'absolute -right-1 -top-1 h-2 w-2 rounded-full',
              'bg-primary shadow-sm'
            )}
          />
        )}
        <span
          className={cn(
            'transition-transform duration-300',
            isHover && 'scale-110'
          )}
        >
          {icon}
        </span>
      </div>
      <span
        className={cn(
          'text-sm font-medium transition-all',
          isHover && 'translate-x-0.5'
        )}
      >
        {text}
      </span>
    </Button>
  )
}
