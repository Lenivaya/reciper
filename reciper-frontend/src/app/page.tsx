import { Coins, LucideIcon, Wallet } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 px-4">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl md:text-6xl">
          Your Culinary Journey
          <br />
          Starts Here
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Discover, create, and share amazing recipes with passionate cooks from around the world.
          Join our community of food lovers today.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl">
        <div className="group relative overflow-hidden rounded-xl border bg-background/50 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/50">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative space-y-2">
            <span className="text-2xl">🥘</span>
            <h3 className="font-semibold">Explore Recipes</h3>
            <p className="text-sm text-muted-foreground">
              Browse through thousands of curated recipes from expert chefs
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border bg-background/50 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/50">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative space-y-2">
            <span className="text-2xl">👨‍🍳</span>
            <h3 className="font-semibold">Connect with Cooks</h3>
            <p className="text-sm text-muted-foreground">
              Learn from and interact with passionate cooks worldwide
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border bg-background/50 p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:border-primary/50">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative space-y-2">
            <span className="text-2xl">📝</span>
            <h3 className="font-semibold">Share Your Recipes</h3>
            <p className="text-sm text-muted-foreground">
              Create and share your own culinary masterpieces
            </p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          className="group relative overflow-hidden rounded-full"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Cooking
            <span className="transition-transform duration-300 group-hover:rotate-12">🍳</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 opacity-90" />
        </Button>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-8 pt-8">
        <div className="text-center">
          <p className="text-3xl font-bold">1000+</p>
          <p className="text-sm text-muted-foreground">Recipes</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">500+</p>
          <p className="text-sm text-muted-foreground">Active Cooks</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold">50k+</p>
          <p className="text-sm text-muted-foreground">Monthly Users</p>
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
      <div className='h-full rounded-lg border border-border/50 p-6 shadow-sm transition-all hover:border-primary/50 hover:bg-muted/10 hover:shadow-md'>
        <Icon className='mb-4 h-12 w-12 text-primary transition-transform group-hover:scale-110' />
        <h2 className='mb-2 text-2xl font-semibold'>{title}</h2>
        <p className='text-muted-foreground'>{description}</p>
      </div>
    </Link>
  )
}
