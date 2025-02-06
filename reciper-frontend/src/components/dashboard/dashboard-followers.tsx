'use client'

import { graphql, readFragment } from 'gql.tada'
import { Key, useMemo } from 'react'
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

  const followers = result.data?.mySubscribersOffset?.items

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {followers?.map((follower) => {
        const followerData = readFragment(FollowerFragment, follower)
        return <Follower key={followerData.id as Key} data={follower} />
      })}
    </div>
  )
}
