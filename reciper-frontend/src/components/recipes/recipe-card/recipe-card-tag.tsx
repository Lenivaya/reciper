import { Badge } from '@/components/ui/badge'
import { getTagColorV2 } from '@/lib/getTagColor'
import { cn } from '@/lib/utils'
import { Tag } from 'lucide-react'

interface RecipeCardTagProps {
  tag: string
  onClick?: (tag: string) => void
  index: number
  className?: string
}

export function RecipeCardTag({
  tag,
  onClick,
  index,
  className
}: RecipeCardTagProps) {
  const colors = getTagColorV2(index)
  return (
    <Badge
      onClick={() => onClick?.(tag)}
      variant='tag'
      className={cn('cursor-pointer', colors, className)}
    >
      <Tag className='mr-1 h-3 w-3' />
      <span className='capitalize'>{tag}</span>
    </Badge>
  )
}
