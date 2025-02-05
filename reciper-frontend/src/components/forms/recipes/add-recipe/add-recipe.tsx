'use client'

import { FileUploader } from '@/components/file-uploader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useControllableState } from '@/hooks/use-controllable-state'
import { useRefreshWithSearchParams } from '@/hooks/use-refresh-with-search-params'
import { useToast } from '@/hooks/use-toast'
import type { DifficultyLevel } from '@/lib/getDifficultyColor'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@urql/next'
import { graphql } from 'gql.tada'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { IngredientSelector } from './ingredient-selector'
import { TagSelector } from './tag-selector'

const difficultyLevels: Record<DifficultyLevel, string> = {
  BEGINNER: 'Beginner',
  EASY: 'Easy',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert'
} as const

const addRecipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  cookingTimeMinutes: z
    .number()
    .min(1, 'Cooking time must be at least 1 minute'),
  difficultyLevel: z.enum([
    'BEGINNER',
    'EASY',
    'INTERMEDIATE',
    'ADVANCED',
    'EXPERT'
  ]),
  instructions: z
    .string()
    .min(10, 'Instructions must be at least 10 characters'),
  ingredients: z.array(
    z.object({
      ingredientId: z.string(),
      amount: z.string()
    })
  ),
  tags: z.array(z.string())
})

type AddRecipeFormValues = z.infer<typeof addRecipeSchema>

const AddRecipeMutation = graphql(`
  mutation AddRecipe($input: AddRecipeInput!) {
    addRecipe(input: $input) {
      errors {
        ... on ReciperError {
          message
        }
      }
      recipe {
        id
        userId
        description
        recipeTags {
          tag {
            name
          }
        }
        recipeIngredients {
          amount
          ingredient {
            name
          }
        }
      }
    }
  }
`)

const AddRecipePhotoMutation = graphql(`
  mutation AddRecipePhoto($input: AddRecipePhotoInput!) {
    addRecipePhoto(input: $input) {
      errors {
        ... on ReciperError {
          message
        }
      }
      recipe {
        images {
          publicId
          url
        }
      }
    }
  }
`)

interface AddRecipeFormProps {
  onSuccess?: () => void
}

export function AddRecipeForm({ onSuccess }: AddRecipeFormProps) {
  const { toast } = useToast()
  const [{ fetching }, addRecipe] = useMutation(AddRecipeMutation)
  const [files, setFiles] = useControllableState<File[]>({
    defaultProp: []
  })
  const [{ fetching: isUploading }, addRecipePhoto] = useMutation(
    AddRecipePhotoMutation
  )
  const refreshWithSearchParams = useRefreshWithSearchParams()

  const form = useForm<AddRecipeFormValues>({
    resolver: zodResolver(addRecipeSchema),
    defaultValues: {
      title: '',
      description: '',
      cookingTimeMinutes: 30,
      difficultyLevel: 'EASY',
      instructions: '',
      ingredients: [],
      tags: []
    }
  })

  const onSubmit = useCallback(
    async (values: AddRecipeFormValues) => {
      try {
        const result = await addRecipe({
          input: {
            createDto: {
              ...values,
              cookingTimeMinutes: Number(values.cookingTimeMinutes),
              images: []
            }
          }
        })

        if (result.error || result.data?.addRecipe.errors) {
          const errors = result.data?.addRecipe.errors
          if (errors) {
            for (const error of errors) {
              form.setError('root', {
                message: error.message
              })
            }
          }
          return
        }

        const recipeId = result.data?.addRecipe.recipe?.id

        // Upload images if there are any
        if (recipeId && files?.length) {
          const uploadPromises = files.map((file, index) =>
            addRecipePhoto({
              input: {
                recipeId,
                file,
                order: index
              }
            })
          )

          await Promise.all(uploadPromises)
        }

        // router.push(`/recipes/${recipeId}`)
        toast({
          title: 'Success',
          description: 'Recipe has been created'
        })
        setFiles([])
        onSuccess?.()
        refreshWithSearchParams()
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description: 'An unexpected error occurred'
        })
      }
    },
    [
      addRecipe,
      files,
      toast,
      setFiles,
      onSuccess,
      form,
      addRecipePhoto,
      refreshWithSearchParams
    ]
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto max-w-2xl space-y-8'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='cookingTimeMinutes'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooking Time (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='difficultyLevel'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select difficulty' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(difficultyLevels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='ingredients'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <IngredientSelector
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagSelector value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='instructions'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea {...field} className='min-h-[120px]' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='space-y-2'>
          <FormLabel>Recipe Images</FormLabel>
          <FileUploader
            accept={{ 'image/*': [] }}
            maxFileCount={4}
            maxSize={1024 * 1024 * 5} // 5MB
            value={files}
            onValueChange={setFiles}
            disabled={fetching || isUploading}
            multiple
          />
          <p className='text-muted-foreground text-sm'>
            Upload up to 4 images. Maximum file size: 5MB each
          </p>
        </div>

        {form.formState.errors.root && (
          <div className='bg-destructive/10 text-destructive rounded-md p-3 text-sm'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button
          type='submit'
          className='w-full'
          disabled={fetching || isUploading}
        >
          {fetching || isUploading ? (
            <>
              <span className='mr-2'>
                {isUploading ? 'Uploading images...' : 'Creating recipe...'}
              </span>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
            </>
          ) : (
            'Create Recipe'
          )}
        </Button>
      </form>
    </Form>
  )
}
