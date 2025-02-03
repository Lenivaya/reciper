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
import { useToast } from '@/hooks/use-toast'
import type * as getDifficultyColor from '@/lib/getDifficultyColor'
import { isSome } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { graphql } from 'gql.tada'
import type React from 'react'
import { memo, useCallback, useEffect, useMemo } from 'react'
import * as reactHookForm from 'react-hook-form'
import { useMutation, useQuery } from 'urql'
import { z } from 'zod'
import { IngredientSelector } from '../add-recipe/ingredient-selector'
import { TagSelector } from '../add-recipe/tag-selector'
import { useRefreshWithSearchParams } from '@/hooks/use-refresh-with-search-params'

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

const GetRecipeForEditQuery = graphql(`
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
        id
        publicId
        url
      }
    }
  }
`)

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
          <FormItem>
            <FormLabel>{label}</FormLabel>
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

    const [{ data }] = useQuery({
      query: GetRecipeForEditQuery,
      requestPolicy: 'network-only',
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

    const onSubmit = useCallback(
      async (values: EditRecipeFormValues) => {
        try {
          const result = await updateRecipe({
            input: {
              recipeId,
              updateDto: {
                title: values.title,
                description: values.description,
                cookingTimeMinutes: Number(values.cookingTimeMinutes),
                difficultyLevel: values.difficultyLevel,
                instructions: values.instructions,
                ingredients: values.ingredients.map((ing) => ({
                  ingredientId: ing.ingredientId,
                  amount: ing.amount
                })),
                tags: values.tags
              }
            }
          })

          if (result.error || result.data?.updateRecipe.errors) {
            const errors = result.data?.updateRecipe.errors

            form.setError('root', {
              message: result.error?.message ?? 'An unexpected error occurred'
            })

            if (isSome(errors)) {
              for (const error of errors) {
                console.error(error)
              }
            }

            return
          }

          await handleImageUpload(recipeId, files ?? [])

          toast({
            title: 'Success',
            description: 'Recipe has been updated'
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
        updateRecipe,
        recipeId,
        handleImageUpload,
        files,
        toast,
        setFiles,
        onSuccess,
        refreshWithSearchParams,
        form
      ]
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
          className='mx-auto max-w-2xl space-y-8'
        >
          <FormFieldWrapper control={form.control} name='title' label='Title'>
            {(field) => <Input {...field} />}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name='description'
            label='Description'
          >
            {(field) => <Textarea {...field} />}
          </FormFieldWrapper>

          <div className='grid grid-cols-2 gap-4'>
            <FormFieldWrapper
              control={form.control}
              name='cookingTimeMinutes'
              label='Cooking Time (minutes)'
            >
              {(field) => (
                <Input
                  type='number'
                  {...field}
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
                    <SelectTrigger>
                      <SelectValue placeholder='Select difficulty' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>{difficultyOptions}</SelectContent>
                </Select>
              )}
            </FormFieldWrapper>
          </div>

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

          <FormFieldWrapper control={form.control} name='tags' label='Tags'>
            {(field) => (
              <TagSelector
                value={field.value}
                onChange={field.onChange}
                initialTags={initialTags}
              />
            )}
          </FormFieldWrapper>

          <FormFieldWrapper
            control={form.control}
            name='instructions'
            label='Instructions'
          >
            {(field) => <Textarea {...field} />}
          </FormFieldWrapper>

          <div className='space-y-2'>
            <FormLabel>Recipe Images</FormLabel>
            <FileUploader
              accept={{ 'image/*': [] }}
              maxFileCount={4}
              maxSize={1024 * 1024 * 5} // 5MB
              value={files}
              onValueChange={setFiles}
              disabled={isUpdating || isUploading}
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
            disabled={isUpdating || isUploading}
          >
            {isUpdating || isUploading ? (
              <>
                <span className='mr-2'>
                  {isUploading ? 'Uploading images...' : 'Updating recipe...'}
                </span>
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
              </>
            ) : (
              'Update Recipe'
            )}
          </Button>
        </form>
      </Form>
    )
  }
)
EditRecipeForm.displayName = 'EditRecipeForm'
