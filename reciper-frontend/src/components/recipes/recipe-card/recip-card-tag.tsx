import { Badge } from '@/components/ui/badge'
import { getTagColorV2 } from '@/lib/getTagColor'
import { cn } from '@/lib/utils'
import { Tag } from 'lucide-react'

interface RecipeCardTagProps {
  tag: string
  index: number
  onClick?: (tag: string) => void
}

export function RecipeCardTag({ tag, index, onClick }: RecipeCardTagProps) {
  return (
    <Badge
      onClick={() => onClick?.(tag)}
      className={cn(getTagColorV2(index), 'border-none shadow-none')}
    >
      <Tag className='mr-1 h-3 w-3' />
      <span className='capitalize'>{tag}</span>
    </Badge>
  )
}
