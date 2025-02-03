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
    <div className='relative'>
      <Image
        alt={image.publicId}
        src={image.url}
        width={300}
        height={300}
        className='rounded-lg'
      />
      <Button
        variant='destructive'
        size='icon'
        className='absolute top-2 right-2 opacity-90 hover:opacity-100'
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
}

export const EditRecipeImages: FC<EditRecipeImagesProps> = ({
  data,
  recipeId,
  onImageDeleted
}) => {
  if (data.length === 0) {
    return (
      <div className='flex h-[300px] items-center justify-center rounded-lg border-2 border-dashed'>
        <p className='text-muted-foreground'>No images uploaded yet</p>
      </div>
    )
  }

  return (
    <Carousel className='w-full'>
      <CarouselContent>
        {data.map((data, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <CarouselItem key={index}>
            <div className='p-1'>
              <Card>
                <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <EditRecipeImage
                    data={data}
                    recipeId={recipeId}
                    onDelete={onImageDeleted}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
