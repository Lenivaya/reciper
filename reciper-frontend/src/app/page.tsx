import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className='flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 px-4'>
      {/* Hero Section */}
      <div className='space-y-4 text-center'>
        <h1 className='bg-linear-to-r from-rose-500 via-amber-500 to-rose-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-6xl'>
          Your Culinary Journey
          <br />
          Starts Here
        </h1>
        <p className='text-muted-foreground mx-auto max-w-2xl'>
          Discover, create, and share amazing recipes with passionate cooks from
          around the world. Join our community of food lovers today.
        </p>
      </div>

      {/* Feature Cards */}
      <div className='grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        <div className='group bg-background/50 hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl'>
          <div className='absolute inset-0 bg-linear-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <div className='relative space-y-2'>
            <span className='text-2xl'>🥘</span>
            <h3 className='font-semibold'>Explore Recipes</h3>
            <p className='text-muted-foreground text-sm'>
              Browse through thousands of curated recipes from expert chefs
            </p>
          </div>
        </div>

        <div className='group bg-background/50 hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl'>
          <div className='absolute inset-0 bg-linear-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <div className='relative space-y-2'>
            <span className='text-2xl'>👨</span>
            <h3 className='font-semibold'>Connect with Cooks</h3>
            <p className='text-muted-foreground text-sm'>
              Learn from and interact with passionate cooks worldwide
            </p>
          </div>
        </div>

        <div className='group bg-background/50 hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl'>
          <div className='absolute inset-0 bg-linear-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
          <div className='relative space-y-2'>
            <span className='text-2xl'>📝</span>
            <h3 className='font-semibold'>Share Your Recipes</h3>
            <p className='text-muted-foreground text-sm'>
              Create and share your own culinary masterpieces
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className='flex justify-center pt-4'>
        <Button
          size='lg'
          className='group relative overflow-hidden rounded-full'
        >
          <span className='relative z-10 flex items-center gap-2'>
            Start Cooking
            <span className='transition-transform duration-300 group-hover:rotate-12'>
              🍳
            </span>
          </span>
          <div className='absolute inset-0 bg-linear-to-r from-rose-500 via-amber-500 to-rose-500 opacity-90' />
        </Button>
      </div>

      {/* Stats Section */}
      <div className='flex flex-wrap justify-center gap-8 pt-8'>
        <div className='text-center'>
          <p className='text-3xl font-bold'>1000+</p>
          <p className='text-muted-foreground text-sm'>Recipes</p>
        </div>
        <div className='text-center'>
          <p className='text-3xl font-bold'>500+</p>
          <p className='text-muted-foreground text-sm'>Active Cooks</p>
        </div>
        <div className='text-center'>
          <p className='text-3xl font-bold'>50k+</p>
          <p className='text-muted-foreground text-sm'>Monthly Users</p>
        </div>
      </div>
    </div>
  )
}

interface DashboardCardProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
}

function DashboardCard({
  href,
  icon: Icon,
  title,
  description
}: DashboardCardProps) {
  return (
    <Link href={href} className='group'>
      <div className='border-border/50 hover:border-primary/50 hover:bg-muted/10 h-full rounded-lg border p-6 shadow-xs transition-all hover:shadow-md'>
        <Icon className='text-primary mb-4 h-12 w-12 transition-transform group-hover:scale-110' />
        <h2 className='mb-2 text-2xl font-semibold'>{title}</h2>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </Link>
  )
}
