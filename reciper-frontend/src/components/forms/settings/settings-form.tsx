'use client'

import { FileUploader } from '@/components/file-uploader'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useControllableState } from '@/hooks/use-controllable-state'
import { useToast } from '@/hooks/use-toast'
import { isSome } from '@/lib/utils'
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

type SettingsFormValues = z.infer<typeof settingsSchema> & {
  profilePicture?: File
  profilePictureUrl?: string
}

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

const UpdateUserProfilePhotoMutation = graphql(`
  mutation UpdateUserProfilePhoto($input: UpdateUserProfilePhotoInput!) {
    updateUserProfilePhoto(input: $input) {
      user {
        profilePictureUrl
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
  const [{ fetching: isUploading }, updateProfilePhoto] = useMutation(
    UpdateUserProfilePhotoMutation
  )

  const [files, setFiles] = useControllableState<File[]>({
    defaultProp: []
  })

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
        const isThereFile = isSome(files?.[0])
        if (isThereFile) {
          const uploadResult = await updateProfilePhoto(
            {
              input: {
                file: files[0]
              }
            },
            {
              headers: {
                'GraphQL-Preflight': 1
              }
            }
          )

          if (uploadResult.error) {
            toast({
              title: 'Error',
              description: 'Failed to upload profile photo',
              variant: 'destructive'
            })
            return
          }
        }

        const result = await updateUser({
          username: values.username,
          profilePictureUrl: isThereFile
            ? null // Since we already uploading it as file
            : values.profilePictureUrl || null,
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

        setFiles([])

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
    [updateUser, updateProfilePhoto, form, toast, files, setFiles]
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
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

        <div className='space-y-2'>
          <Label>Profile Picture</Label>
          <FileUploader
            accept={{ 'image/*': [] }}
            maxFileCount={1}
            maxSize={1024 * 1024 * 2} // 2MB
            value={files}
            onValueChange={setFiles}
            disabled={fetching || isUploading}
          />
          <p className='text-muted-foreground text-sm'>
            Upload a profile picture or provide a URL. Maximum file size: 2MB
          </p>
        </div>

        <FormField
          control={form.control}
          name='profilePictureUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Picture URL</FormLabel>
              <FormControl>
                <Input
                  placeholder='https://example.com/avatar.jpg'
                  {...field}
                  value={field.value ?? ''}
                  disabled={fetching}
                />
              </FormControl>
              <FormDescription>
                Alternatively, you can provide a URL to your profile picture
              </FormDescription>
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
          <div className='bg-destructive/10 text-destructive rounded-md p-3 text-sm'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type='submit' disabled={fetching || isUploading}>
          {fetching || isUploading ? (
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
