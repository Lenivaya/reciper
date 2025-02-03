'use client'

import { RecipeRating } from '@/components/forms/recipes/ratings/recipe-rating'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Star } from 'lucide-react'

interface RecipeRatingSectionProps {
  recipeId: string
  averageRating: number | null
  likesCount: number
}

export function RecipeRatingSection({
  recipeId,
  averageRating,
  likesCount
}: RecipeRatingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>Rate this recipe</CardTitle>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-1'>
            <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
            <span>{averageRating?.toFixed(1) || 'No ratings'}</span>
          </div>
          <div className='text-muted-foreground'>{likesCount} likes</div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className='mb-4'>
          Share your experience with this recipe by rating it
        </CardDescription>
        <RecipeRating recipeId={recipeId} />
      </CardContent>
    </Card>
  )
}
