import { Navbar } from '@/components/layout/navbar/navbar'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from "@/components/ui/sonner"
import { AppUrqlClient } from '@/lib/graphql/urql/AppUrqlClient'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import './globals.css'

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
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <NuqsAdapter>
          <AppUrqlClient>
            <Navbar />
            <div className='mb-10 mt-10'>{children}</div>
            <Toaster />
            <Sonner />
          </AppUrqlClient>
        </NuqsAdapter>
      </body>
    </html>
  )
}
