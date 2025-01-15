'use client'

import {
  Following,
  FollowingFragment
} from '@/components/subscriptions/following'
import { graphql } from 'gql.tada'
import { useMemo } from 'react'
import { useQuery } from 'urql'

const DashboardFollowingQuery = graphql(
  `
    query DashboardFollowingQuery {
      mySubscriptionsOffset {
        items {
          ...FollowingFragment
        }
      }
    }
  `,
  [FollowingFragment]
)

export function DashboardFollowing() {
  const context = useMemo(
    () => ({ additionalTypenames: ['UserSubscription'] }),
    []
  )
  const [result] = useQuery({ query: DashboardFollowingQuery, context })

  const following = result.data?.mySubscriptionsOffset.items

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {following?.map((following) => (
        <Following key={following.id} data={following} />
      ))}
    </div>
  )
}
