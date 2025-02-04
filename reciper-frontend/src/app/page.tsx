import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

const FEATURE_CARDS = [
  {
    href: '/recipes',
    emoji: '🥘',
    title: 'Explore Recipes',
    description: 'Browse through thousands of curated recipes from expert chefs'
  },
  {
    href: '/cooks',
    emoji: '👨',
    title: 'Connect with Cooks',
    description: 'Learn from and interact with passionate cooks worldwide'
  },
  {
    emoji: '📝',
    title: 'Share Your Recipes',
    description: 'Create and share your own culinary masterpieces'
  }
] as const

const STATS = [
  { value: '1000+', label: 'Recipes' },
  { value: '500+', label: 'Active Cooks' },
  { value: '50k+', label: 'Monthly Users' }
] as const

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
        {FEATURE_CARDS.map((card) => (
          <div key={card.title}>
            {'href' in card ? (
              <Link href={card.href}>
                <FeatureCard {...card} />
              </Link>
            ) : (
              <FeatureCard {...card} />
            )}
          </div>
        ))}
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
        {STATS.map(({ value, label }) => (
          <div key={label} className='text-center'>
            <p className='text-3xl font-bold'>{value}</p>
            <p className='text-muted-foreground text-sm'>{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FeatureCardProps {
  emoji: string
  title: string
  description: string
}

function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className='group bg-background/50 hover:border-primary/50 relative overflow-hidden rounded-xl border p-6 shadow-md transition-all duration-300 hover:shadow-xl'>
      <div className='absolute inset-0 bg-linear-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      <div className='relative space-y-2'>
        <span className='text-2xl'>{emoji}</span>
        <h3 className='font-semibold'>{title}</h3>
        <p className='text-muted-foreground text-sm'>{description}</p>
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
