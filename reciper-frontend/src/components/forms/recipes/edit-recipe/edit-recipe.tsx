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
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useControllableState } from '@/hooks/use-controllable-state'
import { useRefreshWithSearchParams } from '@/hooks/use-refresh-with-search-params'
import { useToast } from '@/hooks/use-toast'
import type * as getDifficultyColor from '@/lib/getDifficultyColor'
import { isSome } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { graphql } from 'gql.tada'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { memo, useCallback, useEffect, useMemo } from 'react'
import * as reactHookForm from 'react-hook-form'
import { useMutation, useQuery } from 'urql'
import { z } from 'zod'
import { IngredientSelector } from '../add-recipe/ingredient-selector'
import { TagSelector } from '../add-recipe/tag-selector'
import { EditRecipeImages, RecpeImageFragment } from './edit-recipe-image'

const difficultyLevels: Record<getDifficultyColor.DifficultyLevel, string> = {
  BEGINNER: 'Beginner',
  EASY: 'Easy',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
  EXPERT: 'Expert'
} as const

const editRecipeSchema = z.object({
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

type EditRecipeFormValues = z.infer<typeof editRecipeSchema>

const GetRecipeForEditQuery = graphql(
  `
    query GetRecipeForEditQuery($recipeId: UUID!) {
      recipeById(recipeId: $recipeId) {
        id
        title
        description
        cookingTimeMinutes
        difficultyLevel
        instructions
        recipeIngredients {
          id
          amount
          ingredient {
            id
            name
          }
        }
        recipeTags {
          tag {
            id
            name
          }
        }
        images {
          ...RecipeImageFragment
        }
      }
    }
  `,
  [RecpeImageFragment]
)

const UpdateRecipeMutation = graphql(`
  mutation UpdateRecipe($input: UpdateRecipeInput!) {
    updateRecipe(input: $input) {
      errors {
        ... on ReciperError {
          message
        }
      }
      recipe {
        id
      }
    }
  }
`)

const AddRecipePhotoMutation = graphql(`
  mutation AddRecipePhotoInEdit($input: AddRecipePhotoInput!) {
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

interface EditRecipeFormProps {
  recipeId: string
  onSuccess?: () => void
}

// Extract form field component to prevent re-renders of the entire form
const FormFieldWrapper = memo(
  ({
    control,
    name,
    label,
    children
  }: {
    control: reactHookForm.Control<EditRecipeFormValues>
    name: string
    label: string
    children: (field: reactHookForm.FieldValues) => React.ReactNode
  }) => {
    return (
      <FormField
        control={control}
        name={name as keyof EditRecipeFormValues}
        render={({ field }) => (
          <FormItem className='space-y-4'>
            <FormLabel className='text-foreground/80 flex items-center gap-2 text-lg font-medium'>
              <span className='bg-gradient-to-r from-rose-500/70 to-amber-500/70 bg-clip-text text-transparent'>
                {label}
              </span>
              <div className='h-px flex-1 bg-gradient-to-r from-rose-500/10 to-amber-500/10'></div>
            </FormLabel>
            <FormControl>{children(field)}</FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
)
FormFieldWrapper.displayName = 'FormFieldWrapper'

export const EditRecipeForm = memo(
  ({ recipeId, onSuccess }: EditRecipeFormProps) => {
    const { toast } = useToast()
    const router = useRouter()

    const [{ data }, reexecuteQuery] = useQuery({
      query: GetRecipeForEditQuery,
      requestPolicy: 'cache-and-network',
      variables: { recipeId }
    })

    const refreshWithSearchParams = useRefreshWithSearchParams()

    const [{ fetching: isUpdating }, updateRecipe] =
      useMutation(UpdateRecipeMutation)
    const [files, setFiles] = useControllableState<File[]>({
      defaultProp: []
    })
    const [{ fetching: isUploading }, addRecipePhoto] = useMutation(
      AddRecipePhotoMutation
    )

    const form = reactHookForm.useForm<EditRecipeFormValues>({
      resolver: zodResolver(editRecipeSchema),
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

    // Memoize the initial data for selectors
    const initialIngredients = useMemo(
      () =>
        data?.recipeById?.recipeIngredients?.map((ri) => ({
          id: ri.ingredient?.id as string,
          name: ri.ingredient?.name as string
        })) ?? [],
      [data?.recipeById?.recipeIngredients]
    )

    const initialTags = useMemo(
      () =>
        data?.recipeById?.recipeTags?.map((rt) => ({
          id: rt.tag?.id as string,
          name: rt.tag?.name as string
        })) ?? [],
      [data?.recipeById?.recipeTags]
    )

    // Populate form with recipe data when it's loaded
    useEffect(() => {
      if (data?.recipeById) {
        const recipe = data.recipeById
        form.reset({
          title: recipe.title as string,
          description: recipe.description as string,
          cookingTimeMinutes: recipe.cookingTimeMinutes as number,
          difficultyLevel:
            recipe.difficultyLevel as getDifficultyColor.DifficultyLevel,
          instructions: recipe.instructions as string,
          ingredients:
            recipe.recipeIngredients?.map((ri) => ({
              ingredientId: ri.ingredient?.id as string,
              amount: ri.amount as string
            })) ?? [],
          tags: recipe.recipeTags?.map((rt) => rt.tag?.id as string) ?? []
        })
      }
    }, [data?.recipeById, form])

    const handleImageUpload = useCallback(
      async (recipeId: string, files: File[]) => {
        if (!files?.length) return

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
      },
      [addRecipePhoto]
    )

    const handleImageDeleted = useCallback(() => {
      reexecuteQuery({ requestPolicy: 'network-only' })
    }, [reexecuteQuery])

    const onSubmit = useCallback(
      async (values: EditRecipeFormValues) => {
        const result = await updateRecipe({
          input: {
            recipeId,
            updateDto: {
              title: values.title,
              description: values.description,
              cookingTimeMinutes: values.cookingTimeMinutes,
              difficultyLevel: values.difficultyLevel,
              instructions: values.instructions,
              ingredients: values.ingredients,
              tags: values.tags
            }
          }
        })

        if (result.error || result.data?.updateRecipe?.errors?.length) {
          toast({
            title: 'Error',
            description:
              result.error?.message ??
              result.data?.updateRecipe?.errors?.[0]?.message ??
              'Something went wrong',
            variant: 'destructive'
          })
          return
        }

        if (isSome(files) && files.length > 0) {
          const uploadPromises = files.map((file, index) =>
            addRecipePhoto({
              input: {
                recipeId,
                file,
                order: index
              }
            })
          )

          const photoResults = await Promise.all(uploadPromises)
          const uploadErrors = photoResults.filter(
            (result) =>
              result.error || result.data?.addRecipePhoto?.errors?.length
          )

          if (uploadErrors.length > 0) {
            toast({
              title: 'Error uploading some photos',
              description: 'Some photos failed to upload',
              variant: 'destructive'
            })
          }
        }

        toast({
          title: 'Success',
          description: 'Recipe updated successfully'
        })

        if (onSuccess) {
          onSuccess()
        } else {
          router.back()
        }
      },
      [updateRecipe, recipeId, files, addRecipePhoto, toast, onSuccess, router]
    )

    const difficultyOptions = useMemo(
      () =>
        Object.entries(difficultyLevels).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        )),
      []
    )

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='bg-card mx-auto max-w-3xl space-y-10 rounded-xl p-8 shadow-sm'
        >
          <div>
            <h2 className='bg-gradient-to-r from-rose-500/70 to-amber-500/70 bg-clip-text text-2xl font-semibold text-transparent'>
              Edit Recipe
            </h2>
            <p className='text-muted-foreground mt-2'>
              Update your recipe details below.
            </p>
            <Separator className='my-6' />
          </div>

          <div className='space-y-8'>
            <div className='space-y-8'>
              <FormFieldWrapper
                control={form.control}
                name='title'
                label='Title'
              >
                {(field) => (
                  <Input
                    {...field}
                    className='text-lg'
                    placeholder='Enter recipe title'
                  />
                )}
              </FormFieldWrapper>

              <FormFieldWrapper
                control={form.control}
                name='description'
                label='Description'
              >
                {(field) => (
                  <Textarea
                    {...field}
                    className='min-h-[100px] text-base'
                    placeholder='Describe your recipe...'
                  />
                )}
              </FormFieldWrapper>
            </div>

            <div>
              <h3 className='text-foreground/80 flex items-center gap-2 text-lg font-medium'>
                <span className='bg-gradient-to-r from-rose-500/70 to-amber-500/70 bg-clip-text text-transparent'>
                  Cooking Details
                </span>
                <div className='h-px flex-1 bg-gradient-to-r from-rose-500/10 to-amber-500/10'></div>
              </h3>
              <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormFieldWrapper
                  control={form.control}
                  name='cookingTimeMinutes'
                  label='Cooking Time'
                >
                  {(field) => (
                    <Input
                      type='number'
                      {...field}
                      className='text-base'
                      placeholder='30'
                      onChange={(e) =>
                        field.onChange(Number.parseInt(e.target.value))
                      }
                    />
                  )}
                </FormFieldWrapper>

                <FormFieldWrapper
                  control={form.control}
                  name='difficultyLevel'
                  label='Difficulty'
                >
                  {(field) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='text-base'>
                          <SelectValue placeholder='Select difficulty' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>{difficultyOptions}</SelectContent>
                    </Select>
                  )}
                </FormFieldWrapper>
              </div>
            </div>

            <div>
              <h3 className='text-foreground/80 flex items-center gap-2 text-lg font-medium'>
                <span className='bg-gradient-to-r from-rose-500/70 to-amber-500/70 bg-clip-text text-transparent'>
                  Recipe Components
                </span>
                <div className='h-px flex-1 bg-gradient-to-r from-rose-500/10 to-amber-500/10'></div>
              </h3>
              <div className='mt-6 space-y-8'>
                <FormFieldWrapper
                  control={form.control}
                  name='ingredients'
                  label='Ingredients'
                >
                  {(field) => (
                    <IngredientSelector
                      value={field.value}
                      onChange={field.onChange}
                      initialIngredients={initialIngredients}
                    />
                  )}
                </FormFieldWrapper>

                <FormFieldWrapper
                  control={form.control}
                  name='tags'
                  label='Tags'
                >
                  {(field) => (
                    <TagSelector
                      value={field.value}
                      onChange={field.onChange}
                      initialTags={initialTags}
                    />
                  )}
                </FormFieldWrapper>
              </div>
            </div>

            <div>
              <h3 className='text-foreground/80 flex items-center gap-2 text-lg font-medium'>
                <span className='bg-gradient-to-r from-rose-500/70 to-amber-500/70 bg-clip-text text-transparent'>
                  Instructions & Media
                </span>
                <div className='h-px flex-1 bg-gradient-to-r from-rose-500/10 to-amber-500/10'></div>
              </h3>
              <div className='mt-6 space-y-8'>
                <FormFieldWrapper
                  control={form.control}
                  name='instructions'
                  label='Instructions'
                >
                  {(field) => (
                    <Textarea
                      {...field}
                      className='min-h-[200px] text-base'
                      placeholder='Write step-by-step instructions...'
                    />
                  )}
                </FormFieldWrapper>

                <div className='space-y-4'>
                  <FormLabel className='text-foreground/80 flex items-center gap-2 text-lg font-medium'>
                    <span className='bg-gradient-to-r from-rose-500/70 to-amber-500/70 bg-clip-text text-transparent'>
                      Recipe Images
                    </span>
                    <div className='h-px flex-1 bg-gradient-to-r from-rose-500/10 to-amber-500/10'></div>
                  </FormLabel>

                  <EditRecipeImages
                    data={data?.recipeById?.images ?? []}
                    recipeId={recipeId}
                    onImageDeleted={handleImageDeleted}
                    className='mb-6'
                  />

                  <FileUploader
                    accept={{ 'image/*': [] }}
                    maxFileCount={4}
                    maxSize={1024 * 1024 * 5} // 5MB
                    value={files}
                    onValueChange={setFiles}
                    disabled={isUpdating || isUploading}
                    multiple
                    className='hover:border-primary/50 rounded-lg border-2 border-dashed p-8 transition-colors'
                  />
                  <p className='text-muted-foreground text-sm'>
                    Upload up to 4 images. Maximum file size: 5MB each
                  </p>
                </div>
              </div>
            </div>
          </div>

          {form.formState.errors.root && (
            <div className='bg-destructive/10 text-destructive rounded-lg p-4 text-sm font-medium'>
              {form.formState.errors.root.message}
            </div>
          )}

          <div>
            <Separator className='mb-6' />
            <Button
              type='submit'
              className='w-full py-6 text-base font-medium'
              size='lg'
              disabled={isUpdating || isUploading}
            >
              {isUpdating || isUploading ? (
                <>
                  <span className='mr-3 text-base'>
                    {isUploading ? 'Uploading images...' : 'Updating recipe...'}
                  </span>
                  <span className='h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent' />
                </>
              ) : (
                'Update Recipe'
              )}
            </Button>
          </div>
        </form>
      </Form>
    )
  }
)
EditRecipeForm.displayName = 'EditRecipeForm'
