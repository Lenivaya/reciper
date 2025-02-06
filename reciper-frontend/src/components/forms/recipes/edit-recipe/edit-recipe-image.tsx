import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, type FC } from 'react'
import { useMutation } from 'urql'

export const RecpeImageFragment = graphql(`
  fragment RecipeImageFragment on RecipeImage {
    id
    publicId
    url
  }
`)

export const DeleteRecipeImageMutation = graphql(`
  mutation DeleteRecipeImage($input: DeleteRecipePhotoInput!) {
    deleteRecipePhoto(input: $input) {
      errors {
        ... on ReciperError {
          message
        }
      }
      recipeImage {
        id
      }
    }
  }
`)

type RecipeImage = FragmentOf<typeof RecpeImageFragment>

interface EditRecipeImageProps {
  data: RecipeImage
  recipeId: string
  onDelete?: () => void
}

export const EditRecipeImage: FC<EditRecipeImageProps> = ({
  data,
  recipeId,
  onDelete
}) => {
  const { toast } = useToast()
  const image = readFragment(RecpeImageFragment, data)

  const [{ fetching }, deleteRecipeImage] = useMutation(
    DeleteRecipeImageMutation
  )

  const handleDelete = useCallback(async () => {
    try {
      const result = await deleteRecipeImage({
        input: {
          photoId: image.id,
          recipeId
        }
      })

      if (result.error || result.data?.deleteRecipePhoto.errors?.length) {
        toast({
          title: 'Error',
          description: 'Failed to delete image',
          variant: 'destructive'
        })
        return
      }

      toast({
        title: 'Success',
        description: 'Image deleted successfully'
      })
      onDelete?.()
    } catch (error) {
      console.error('Failed to delete image:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      })
    }
  }, [deleteRecipeImage, image.id, recipeId, onDelete, toast])

  return (
    <div className='group relative'>
      <Image
        alt={image.publicId}
        src={image.url}
        width={800}
        height={600}
        className='aspect-[4/3] w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.02]'
      />
      <Button
        variant='destructive'
        size='icon'
        className='absolute top-3 right-3 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 hover:shadow-lg'
        onClick={handleDelete}
        disabled={fetching}
      >
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
  )
}

interface EditRecipeImagesProps {
  data: RecipeImage[]
  recipeId: string
  onImageDeleted?: () => void
  className?: string
}

export const EditRecipeImages: FC<EditRecipeImagesProps> = ({
  data,
  recipeId,
  onImageDeleted,
  className
}) => {
  if (data.length === 0) {
    return (
      <div className='bg-muted/5 flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed'>
        <p className='text-muted-foreground text-base'>
          No images uploaded yet
        </p>
      </div>
    )
  }

  return (
    <Carousel className={cn('w-full', className)}>
      <CarouselContent className='-ml-2 md:-ml-4'>
        {data.map((data, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <CarouselItem key={index} className='pl-2 md:pl-4'>
            <Card className='border-none shadow-none'>
              <CardContent className='p-0'>
                <EditRecipeImage
                  data={data}
                  recipeId={recipeId}
                  onDelete={onImageDeleted}
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='mt-10 flex items-center justify-center gap-2'>
        <CarouselPrevious className='relative static' />
        <CarouselNext className='relative static' />
      </div>
    </Carousel>
  )
}
