import { CooksSearch } from '@/components/cooks/cooks-search/cooks-search'
import { CooksSearchList } from '@/components/cooks/cooks-search/cooks-search-list'
import { cookSearchParamsCache } from '@/components/cooks/cooks-search/cooks-search-params'
import { ChefHat } from 'lucide-react'
import { SearchParams } from 'nuqs/server'
import { Suspense } from 'react'

interface CooksPageProps {
  searchParams: Promise<SearchParams>
}

export default async function CooksPage({ searchParams }: CooksPageProps) {
  await cookSearchParamsCache.parse(searchParams)

  return (
    <main className='from-background via-background to-background/80 dark:from-background dark:via-background/95 dark:to-background/75 relative container mx-auto flex bg-linear-to-b px-6 pt-20'>
      <div className='flex w-full flex-col items-center p-10'>
        <div className='flex w-full max-w-[1400px] flex-col items-center justify-center gap-4'>
          <h1 className='from-primary/60 to-primary flex items-center gap-2 bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent'>
            <span className=''>
              <ChefHat className='dark:text-primary mr-1 h-10 w-10' />
            </span>
            Cooks
          </h1>
          <div className='w-full max-w-xl'>
            <Suspense>
              <CooksSearch />
            </Suspense>
          </div>
        </div>

        <div className='mx-auto mt-10 h-max w-full max-w-[1400px]'>
          <Suspense
            fallback={
              <div className='flex flex-wrap justify-center gap-6'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className='bg-muted/20 h-[200px] w-[400px] animate-pulse rounded-lg'
                  />
                ))}
              </div>
            }
          >
            <CooksSearchList />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
