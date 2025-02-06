'use client'

import { RecipeRating } from '@/components/forms/recipes/ratings/recipe-rating'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { graphql } from 'gql.tada'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useQuery } from 'urql'

interface RecipeRatingSectionProps {
  recipeId: string
  intialAverageRating?: number
}

const GetRecipeAverageRatingQuery = graphql(`
  query GetRecipeAverageRatingQuery($recipeId: UUID!) {
    recipeById(recipeId: $recipeId) {
      averageRating
      id
    }
  }
`)

export function RecipeRatingSection({
  recipeId,
  intialAverageRating
}: RecipeRatingSectionProps) {
  const [averageRating, setAverageRating] = useState(intialAverageRating)
  const [resultGetAverageRating, refetchGetAverageRating] = useQuery({
    query: GetRecipeAverageRatingQuery,
    variables: { recipeId },
    requestPolicy: 'cache-and-network'
  })
  useEffect(() => {
    setAverageRating(resultGetAverageRating.data?.recipeById?.averageRating)
  }, [resultGetAverageRating.data?.recipeById?.averageRating])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Rate this recipe</CardTitle>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
            <span>{averageRating?.toFixed(1) || 'No ratings'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className='mb-4'>
          Share your experience with this recipe by rating it
        </CardDescription>
        <RecipeRating
          recipeId={recipeId}
          onSuccess={() => refetchGetAverageRating()}
        />
      </CardContent>
    </Card>
  )
}
