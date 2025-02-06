'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { graphql } from 'gql.tada'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'urql'
import { z } from 'zod'

export const AddCommentMutation = graphql(`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      comment {
        id
        content
      }
    }
  }
`)

const addCommentSchema = z.object({
  content: z.string().min(1, 'Comment must be at least 1 character')
})

type AddCommentSchema = z.infer<typeof addCommentSchema>

interface AddRecipeCommentFormProps {
  recipeId: string
  onSuccess?: () => void
}

export const AddRecipeCommentForm = ({
  recipeId,
  onSuccess
}: AddRecipeCommentFormProps) => {
  const { toast } = useToast()
  const [{ fetching }, addComment] = useMutation(AddCommentMutation)

  const form = useForm<AddCommentSchema>({
    resolver: zodResolver(addCommentSchema),
    defaultValues: {
      content: ''
    }
  })

  const onSubmit = useCallback(
    async (values: AddCommentSchema) => {
      try {
        const result = await addComment({
          input: {
            createDto: {
              recipeId,
              content: values.content
            }
          }
        })

        if (result.error) {
          form.setError('root', {
            message: result.error.message
          })
          return
        }

        toast({
          title: 'Success',
          description: 'Comment added successfully'
        })

        form.reset()
        onSuccess?.()
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong',
          variant: 'destructive'
        })
      }
    },
    [addComment, form, onSuccess, recipeId, toast]
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder='Add a comment...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={fetching}>
          {fetching ? 'Adding...' : 'Add Comment'}
        </Button>
      </form>
    </Form>
  )
}
