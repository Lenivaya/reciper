import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function RecipeCardSkeleton() {
  return (
    <div className='group transform transition-all duration-300 hover:-translate-y-1'>
      <div className='absolute inset-0 -z-10 h-[400px] w-[300px] rounded-xl bg-linear-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100' />
      <Card className='border-border/40 bg-background/80 hover:border-border/60 relative flex w-[300px] flex-col overflow-hidden backdrop-blur-xs transition-all duration-300 hover:shadow-lg'>
        <div className='absolute inset-0 bg-linear-to-r from-rose-500/5 via-amber-500/5 to-rose-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        {/* Cover Image Skeleton */}
        <div className='relative h-40 w-full overflow-hidden'>
          <Skeleton className='h-full w-full' />
        </div>

        <CardHeader className='relative space-y-2'>
          <div className='flex items-center space-x-4'>
            {/* Avatar Skeleton */}
            <Skeleton className='h-10 w-10 rounded-full' />
            <div className='min-w-0 flex-1 space-y-2'>
              {/* Title Skeleton */}
              <Skeleton className='h-6 w-3/4' />
              {/* Username and Date Skeletons */}
              <div className='space-y-1'>
                <Skeleton className='h-4 w-1/2' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className='relative flex-1 space-y-4'>
          {/* Description Skeleton */}
          <div className='space-y-1'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-5/6' />
          </div>

          {/* Tags Skeleton */}
          <div className='flex flex-wrap gap-2'>
            <Skeleton className='h-6 w-16 rounded-full' />
            <Skeleton className='h-6 w-20 rounded-full' />
            <Skeleton className='h-6 w-24 rounded-full' />
          </div>

          {/* Stats Skeleton */}
          <div className='flex justify-between'>
            <Skeleton className='h-5 w-20' />
            <Skeleton className='h-5 w-16' />
            <Skeleton className='h-5 w-16' />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
