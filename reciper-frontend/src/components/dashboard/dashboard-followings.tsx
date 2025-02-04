'use client'

import {
  Following,
  FollowingFragment
} from '@/components/subscriptions/following'
import { graphql, readFragment } from 'gql.tada'
import { Key, useMemo } from 'react'
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

  const following = result.data?.mySubscriptionsOffset?.items

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {following?.map((following) => {
        const followingData = readFragment(FollowingFragment, following)
        return <Following key={followingData.id as Key} data={following} />
      })}
    </div>
  )
}
