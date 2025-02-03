import { RecipeCommentsSection } from '@/components/recipes/comments/recipe-comments-section'
import { RecipeCardTags } from '@/components/recipes/recipe-card/recip-card-tags'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { Key } from 'react'

export const RecipePageFragment = graphql(`
  fragment RecipePageFragment on Recipe {
    id
    title
    description
    images {
      id
      url
      order
    }
    recipeIngredients {
      ingredient {
        id
        name
      }
      amount
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

interface RecipePageContentProps {
  recipe: FragmentOf<typeof RecipePageFragment>
}

export function RecipePageContent({
  recipe: fragmentRef
}: RecipePageContentProps) {
  const recipe = readFragment(RecipePageFragment, fragmentRef)

  return (
    <div className='container mx-auto px-4 py-20'>
      {/* Recipe Details Section */}
      <div className='grid gap-6 md:grid-cols-[2fr_1fr]'>
        {/* Left column - Images and Description */}
        <div className='space-y-6'>
          {/* Image Carousel */}
          <Card>
            <CardContent className='p-6'>
              <Carousel className='w-full'>
                <CarouselContent>
                  {recipe.images.map((image) => (
                    <CarouselItem key={image.id as Key}>
                      <div className='relative aspect-[16/9] w-full overflow-hidden rounded-lg'>
                        <Image
                          src={image.url}
                          alt={recipe.title}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          priority={image.order === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>{recipe.title}</CardTitle>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                  <span>
                    {recipe.averageRating?.toFixed(1) || 'No ratings'}
                  </span>
                </div>
                <div className='text-muted-foreground'>
                  {recipe.likesCount} likes
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>{recipe.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Ingredients and Tags */}
        <div className='space-y-6'>
          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
              <CardDescription>What you'll need</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className='h-[300px] pr-4'>
                <ul className='space-y-2'>
                  {recipe.recipeIngredients.map((item) => (
                    <li
                      key={item.ingredient.id as Key}
                      className='flex items-center justify-between'
                    >
                      <span>{item.ingredient.name}</span>
                      <span className='text-muted-foreground'>
                        {item.amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <RecipeCardTags
                tags={recipe.recipeTags.map((tag) => tag.tag.name)}
                maxTags={100}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comments Section */}
      <RecipeCommentsSection recipeId={recipe.id as string} />
    </div>
  )
}
