import { Utensils } from 'lucide-react'
import { FC } from 'react'
import { CookCardSubscribers } from './cook-card/cook-card-subscribers'

interface CookCardProps {
  cook: {
    id: string
    name: string
    image?: string | null
    recipesCount: number
    subscribersCount: number
    isSubscribed?: boolean
  }
}

export const CookCard: FC<CookCardProps> = ({ cook }) => {
  return (
    <div className='group bg-card hover:border-primary relative overflow-hidden rounded-lg border p-3 transition-colors'>
      {/* ... existing avatar and name code ... */}

      <div className='flex justify-center gap-6'>
        <div className='hover:text-primary flex items-center gap-1.5 transition-colors duration-300'>
          <Utensils className='h-4 w-4 shrink-0' />
          <span className='text-sm font-medium'>
            {cook.recipesCount} recipes
          </span>
        </div>
        <CookCardSubscribers
          subscribersCount={cook.subscribersCount}
          cookId={cook.id}
        />
      </div>
    </div>
  )
}
