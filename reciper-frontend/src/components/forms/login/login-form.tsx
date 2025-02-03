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

const loginSchema = z.object({
  login: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginMutation = graphql(
  `
    mutation Login($login: String!, $password: String!) {
      loginUser(input: { loginDto: { login: $login, password: $password } }) {
        errors {
          ... on ReciperError {
            message
          }
        }
        userLoginPayload {
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

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_token, setAuthToken, _removeValue] = useAuthToken()
  const [{ fetching }, login] = useMutation(LoginMutation)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: ''
    }
  })

  const onSubmit = useCallback(
    async (values: LoginFormValues) => {
      try {
        const result = await login(values)

        if (result.data?.loginUser.errors) {
          const error = result.data.loginUser.errors[0]
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

        const token = result.data?.loginUser.userLoginPayload?.token
        if (isSome(token)) {
          setAuthToken(token)
          router.push('/')
          toast({
            title: 'Logged in',
            description: 'You are now logged in'
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
    [login, form, router, toast, setAuthToken]
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mx-auto w-full max-w-md space-y-6 rounded-lg border p-6 shadow-xs sm:p-8'
      >
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Welcome back
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your credentials to access your account
          </p>
        </div>

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='login'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your username'
                    {...field}
                    disabled={fetching}
                    className='shadow-xs'
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
                    className='shadow-xs'
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
              <span className='mr-2'>Logging in</span>
              <span className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </Form>
  )
}
