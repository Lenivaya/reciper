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
import { getClient } from '@/lib/graphql/urql/client'
import { graphql } from 'gql.tada'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface RecipeImage {
  id: string
  url: string
  order: number
}

interface RecipeIngredient {
  ingredient: {
    id: string
    name: string
  }
  amount: string
}

interface RecipeTag {
  tag: {
    id: string
    name: string
  }
}

const GetRecipeForPageQuery = graphql(`
  query GetRecipeForPage($id: UUID!) {
    recipeById(recipeId: $id) {
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
  }
`)

export default async function RecipePage({
  params
}: {
  params: { id: string }
}) {
  const result = await getClient().query(GetRecipeForPageQuery, {
    id: params.id
  })

  if (result.error) {
    return <div>Error: {result.error.message}</div>
  }

  if (!result.data?.recipeById) {
    return <div>Recipe not found</div>
  }

  const recipe = result.data.recipeById
  const images = recipe.images as RecipeImage[]
  const ingredients = recipe.recipeIngredients as RecipeIngredient[]
  const tags = recipe.recipeTags as RecipeTag[]

  return (
    <div className='container mx-auto px-4 py-20'>
      <div className='grid gap-6 md:grid-cols-[2fr_1fr]'>
        {/* Left column - Images and Description */}
        <div className='space-y-6'>
          {/* Image Carousel */}
          <Card>
            <CardContent className='p-6'>
              <Carousel className='w-full'>
                <CarouselContent>
                  {images.map((image) => (
                    <CarouselItem key={image.id}>
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
                  {ingredients.map((item) => (
                    <li
                      key={item.ingredient.id}
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
                tags={tags.map((tag) => tag.tag.name)}
                maxTags={100}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
