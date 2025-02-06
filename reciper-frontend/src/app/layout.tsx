import { Navbar } from '@/components/layout/navbar/navbar'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { Toaster } from '@/components/ui/toaster'
import { AppUrqlClient } from '@/lib/graphql/urql/AppUrqlClient'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'
import { AuthProvider } from '@/providers/auth-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Reciper',
  description: 'Discover recipes and cook delicious meals'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='dark'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground min-h-screen antialiased`}
      >
        <NuqsAdapter>
          <AppUrqlClient>
            <AuthProvider>
              <Navbar />
              <div className='mt-10 mb-10'>{children}</div>
              <Toaster />
              <Sonner />
            </AuthProvider>
          </AppUrqlClient>
        </NuqsAdapter>
      </body>
    </html>
  )
}
