'use client'

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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@urql/next'
import { FragmentOf, graphql, readFragment } from 'gql.tada'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const UpdateUserFragment = graphql(`
  fragment UpdateUserFragment on User {
    id
    username
    profilePictureUrl
    bio
  }
`)

const settingsSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  profilePictureUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .nullable(),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .nullable()
})

type SettingsFormValues = z.infer<typeof settingsSchema>

const UpdateUserMutation = graphql(`
  mutation UpdateUser(
    $username: String
    $profilePictureUrl: String
    $bio: String
  ) {
    updateUser(
      input: {
        userPatchDto: {
          username: $username
          profilePictureUrl: $profilePictureUrl
          bio: $bio
        }
      }
    ) {
      errors {
        ... on ReciperError {
          message
        }
      }
      user {
        id
        username
        profilePictureUrl
        bio
      }
    }
  }
`)

interface SettingsFormProps {
  data: FragmentOf<typeof UpdateUserFragment>
}

export function SettingsForm({ data }: SettingsFormProps) {
  const user = readFragment(UpdateUserFragment, data)

  const { toast } = useToast()
  const [{ fetching }, updateUser] = useMutation(UpdateUserMutation)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: user.username,
      profilePictureUrl: user.profilePictureUrl ?? '',
      bio: user.bio ?? ''
    }
  })

  const onSubmit = useCallback(
    async (values: SettingsFormValues) => {
      try {
        const result = await updateUser({
          username: values.username,
          profilePictureUrl: values.profilePictureUrl || null,
          bio: values.bio || null
        })

        if (result.error) {
          form.setError('root', {
            message: result.error.message
          })
          toast({
            title: 'Error',
            description: result.error.message
          })
          return
        }

        if (result.data?.updateUser.errors) {
          form.setError('root', {
            message: result.data.updateUser.errors[0].message
          })
          toast({
            title: 'Error',
            description: result.data.updateUser.errors[0].message
          })
          return
        }

        toast({
          title: 'Settings updated',
          description: 'Your profile has been updated successfully'
        })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description:
            'An unexpected error occurred while updating your profile'
        })
      }
    },
    [updateUser, form, toast]
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your username'
                  {...field}
                  disabled={fetching}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='profilePictureUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='https://example.com/your-picture.jpg'
                  {...field}
                  value={field.value ?? ''}
                  disabled={fetching}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us about yourself'
                  className='resize-none'
                  {...field}
                  value={field.value ?? ''}
                  disabled={fetching}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.root && (
          <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type='submit' disabled={fetching}>
          {fetching ? (
            <>
              <span className='mr-2'>Saving</span>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
            </>
          ) : (
            'Save changes'
          )}
        </Button>
      </form>
    </Form>
  )
}
