'use client'

import { graphql } from 'gql.tada'
import { useMemo } from 'react'
import { useQuery } from 'urql'
import { Follower, FollowerFragment } from '../subscriptions/follower'

const DashboardFollowersQuery = graphql(
  `
    query DashboardFollowersQuery {
      mySubscribersOffset {
        items {
          ...FollowerFragment
        }
      }
    }
  `,
  [FollowerFragment]
)

export function DashboardFollowers() {
  const context = useMemo(
    () => ({ additionalTypenames: ['UserSubscription'] }),
    []
  )
  const [result] = useQuery({ query: DashboardFollowersQuery, context })

  const followers = result.data?.mySubscribersOffset.items

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {followers?.map((follower) => (
        <Follower key={follower.id} data={follower} />
      ))}
    </div>
  )
}
