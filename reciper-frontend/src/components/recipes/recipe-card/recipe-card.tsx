import { EditRecipeDialog } from '@/components/forms/recipes/edit-recipe/edit-recipe-dialog'
import { ShowOnlyForUser } from '@/components/layout/show-only-for-user'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { format } from 'date-fns'
import { graphql, readFragment, type FragmentOf } from 'gql.tada'
import { CalendarDays, Clock, Star, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo, type FC } from 'react'
import { RecipeCardTags } from './recip-card-tags'
import { RecipeCardDeleteButton } from './recipe-card-delete-button'
import { RecipeCardDifficulty } from './recipe-card-difficulty'
import { RecipeCardLike } from './recipe-card-like'

export const RecipeCardFragment = graphql(`
  fragment RecipeCardFragment on Recipe {
    id
    title
    description
    cookingTimeMinutes
    difficultyLevel
    createdAt
    user {
      id
      username
      profilePictureUrl
    }
    images {
      id
      url
      order
    }
    recipeTags {
      tag {
        id
        name
      }
    }
    averageRating
    likesCount
  }
`)

interface Props {
  data: FragmentOf<typeof RecipeCardFragment>
}

export const RecipeCard: FC<Props> = ({ data }) => {
  const recipe = readFragment(RecipeCardFragment, data)
  const coverImage = useMemo(
    () => recipe.images.sort((a, b) => a.order - b.order).at(0),
    [recipe.images]
  )

  return (
    <div className='group transform transition-all duration-300 hover:-translate-y-1'>
      <div className='absolute inset-0 -z-10 h-[400px] w-[300px] rounded-xl bg-linear-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
      <Card className='border-border/40 bg-background/80 hover:border-border/60 relative flex w-[300px] flex-col overflow-hidden backdrop-blur-xs transition-all duration-300 hover:shadow-lg'>
        <div className='absolute inset-0 bg-linear-to-r from-rose-500/5 via-amber-500/5 to-rose-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        {/* Cover Image */}
        <div className='relative h-40 w-full overflow-hidden'>
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={recipe.title}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-110'
              sizes='300px'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-linear-to-r from-rose-500/10 to-amber-500/10'>
              <span className='text-muted-foreground text-lg'>No image</span>
            </div>
          )}
        </div>

        <CardHeader className='relative space-y-2'>
          <div className='flex items-center space-x-4'>
            <Avatar className='ring-border/40 group-hover:ring-border/60 h-10 w-10 shrink-0 ring-2 transition-all duration-300 group-hover:scale-110'>
              <AvatarImage src={recipe.user.profilePictureUrl ?? ''} />
              <AvatarFallback className='bg-linear-to-r from-rose-500/10 to-amber-500/10'>
                {recipe.user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <Link href={`/recipes/${recipe.id}`}>
                <CardTitle className='group-hover:text-primary truncate text-lg font-bold transition-colors duration-300'>
                  {recipe.title}
                </CardTitle>
              </Link>
              <div className='flex flex-col gap-0.5'>
                <p className='text-muted-foreground flex items-center gap-1 text-sm'>
                  <User className='h-4 w-4 shrink-0' />
                  <span className='truncate'>{recipe.user.username}</span>
                </p>
                <p className='text-muted-foreground flex items-center gap-1 text-sm'>
                  <CalendarDays className='h-4 w-4 shrink-0' />
                  <span className='truncate'>
                    {format(new Date(recipe.createdAt as string), 'MMMM yyyy')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='relative flex-1 space-y-4'>
          <p className='text-muted-foreground/90 group-hover:text-muted-foreground line-clamp-2 text-sm transition-colors duration-300'>
            {recipe.description}
          </p>

          <div className='flex flex-wrap gap-2'>
            <RecipeCardDifficulty difficultyLevel={recipe.difficultyLevel} />
            <RecipeCardTags
              tags={recipe.recipeTags.map((tag) => tag.tag.name)}
              maxTags={10}
            />
          </div>

          <div className='flex justify-between'>
            <div className='hover:text-primary flex items-center gap-1.5 transition-colors duration-300'>
              <Clock className='h-4 w-4 shrink-0' />
              <span className='text-sm font-medium'>
                {recipe.cookingTimeMinutes} min
              </span>
            </div>
            <div className='hover:text-primary flex items-center gap-1.5 transition-colors duration-300'>
              <Star className='h-4 w-4 shrink-0 fill-current' />
              <span className='text-sm font-medium'>
                {recipe.averageRating?.toFixed(1) ?? 0}
              </span>
            </div>
            <RecipeCardLike
              recipeId={recipe.id as string}
              totalRecipeLikes={recipe.likesCount}
            />
          </div>
        </CardContent>

        <CardFooter className='relative'>
          <Link href={`/recipes/${recipe.id}`} className='w-full'>
            <Button className='group/btn hover:shadow-primary/10 w-full bg-linear-to-r from-rose-500 to-amber-500 text-white transition-all duration-300 hover:shadow-lg'>
              View Recipe
              <Clock className='ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-12' />
            </Button>
          </Link>
        </CardFooter>

        <RecipeCardDeleteButton
          recipeId={recipe.id as string}
          recipeName={recipe.title}
          recipeAuthorId={recipe.user.id as string}
        />
        <ShowOnlyForUser userIdToCheckAuth={recipe.user.id as string}>
          <EditRecipeDialog recipeId={recipe.id as string} />
        </ShowOnlyForUser>
      </Card>
    </div>
  )
}
