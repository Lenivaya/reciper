'use client'

import { NavbarUserAuthenticatedFragment } from '@/components/layout/navbar/navbar-user/navbar-user-authenticated'
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
import { useAuthToken } from '@/hooks/use-auth-token'
import { useToast } from '@/hooks/use-toast'
import { isSome } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@urql/next'
import { graphql } from 'gql.tada'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  profilePictureUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .nullable(),
  bio: z
    .string()
    .max(500, 'Bio must be less than 500 characters')
    .optional()
    .nullable()
})

type RegisterFormValues = z.infer<typeof registerSchema>

const RegisterMutation = graphql(
  `
    mutation Register(
      $username: String!
      $email: String!
      $password: String!
      $profilePictureUrl: String
      $bio: String
    ) {
      registerUser(
        input: {
          userCreateDto: {
            username: $username
            email: $email
            password: $password
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
        userRegisterPayload {
          token
          user {
            ...NavbarUserAuthenticated
          }
        }
      }
    }
  `,
  [NavbarUserAuthenticatedFragment]
)

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_token, setAuthToken, _removeValue] = useAuthToken()
  const [{ fetching }, register] = useMutation(RegisterMutation)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      profilePictureUrl: null,
      bio: null
    }
  })

  const onSubmit = useCallback(
    async (values: RegisterFormValues) => {
      try {
        const result = await register(values)

        if (result.data?.registerUser.errors) {
          const error = result.data.registerUser.errors[0]
          form.setError('root', {
            message: error.message
          })
          return
        }

        if (result.error) {
          form.setError('root', {
            message: result.error.message
          })
          return
        }

        const token = result.data?.registerUser.userRegisterPayload?.token
        if (isSome(token)) {
          setAuthToken(token)
          router.push('/')
          toast({
            title: 'Account created',
            description: 'Your account has been created successfully'
          })
        }
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description:
            'An unexpected error occurred, please try again later or check console'
        })
        form.setError('root', {
          message:
            'An unexpected error occurred, please try again later or check console'
        })
      }
    },
    [register, form, router, toast, setAuthToken]
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full max-w-md space-y-6 rounded-lg border p-6 shadow-sm sm:p-8'
      >
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Create an account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your information to create your account
          </p>
        </div>

        <div className='space-y-4'>
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
                    className='shadow-sm'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    {...field}
                    disabled={fetching}
                    className='shadow-sm'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    {...field}
                    disabled={fetching}
                    className='shadow-sm'
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
                <FormLabel>Profile Picture URL (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter profile picture URL'
                    {...field}
                    value={field.value ?? ''}
                    disabled={fetching}
                    className='shadow-sm'
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
                <FormLabel>Bio (optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us about yourself'
                    {...field}
                    value={field.value ?? ''}
                    disabled={fetching}
                    className='h-32 resize-none shadow-sm'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {form.formState.errors.root && (
          <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
            {form.formState.errors.root.message}
          </div>
        )}

        <Button type='submit' className='w-full' disabled={fetching}>
          {fetching ? (
            <>
              <span className='mr-2'>Creating account</span>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </Form>
  )
}
