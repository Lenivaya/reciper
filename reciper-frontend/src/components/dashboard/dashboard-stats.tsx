'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@urql/next'
import { graphql } from 'gql.tada'
import { ChefHat, Heart, Users } from 'lucide-react'

export const StatsQuery = graphql(`
  query DashboardStats {
    me {
      id
      recipesCount
      totalRecipesLikes
      subscribersCount
    }
  }
`)

export function DashboardStats() {
  const [result] = useQuery({
    query: StatsQuery
  })

  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Recipes</CardTitle>
          <ChefHat className='h-4 w-4 text-orange-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {result.data?.me?.recipesCount ?? 0}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Likes</CardTitle>
          <Heart className='h-4 w-4 text-red-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {result.data?.me?.totalRecipesLikes ?? 0}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Followers</CardTitle>
          <Users className='h-4 w-4 text-blue-500' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {result.data?.me?.subscribersCount ?? 0}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
