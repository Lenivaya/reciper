'use client'

import { Button } from '@/components/ui/button'
import { Utensils } from 'lucide-react'
import { useCookCardRecipesRedirect } from './use-cook-card-recipes-redirect'

export const CookCardRecipesButton = ({ cookId }: { cookId: string }) => {
  const { handleRedirect } = useCookCardRecipesRedirect(cookId, false)

  return (
    <Button
      onClick={handleRedirect}
      className='group/btn hover:shadow-primary/10 w-full bg-linear-to-r from-rose-500 to-amber-500 text-white transition-all duration-300 hover:shadow-lg'
    >
      View Recipes
      <Utensils className='ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12' />
    </Button>
  )
}
