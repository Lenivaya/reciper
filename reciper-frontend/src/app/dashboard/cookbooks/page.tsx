import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'

export default function CookbooksPage() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-semibold tracking-tight'>Cookbooks</h2>
          <p className='text-muted-foreground text-sm'>
            Organize your recipes into collections
          </p>
        </div>
        <Button>
          <PlusCircle className='mr-2 h-4 w-4' />
          New Cookbook
        </Button>
      </div>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className='group relative overflow-hidden rounded-lg border p-6'
          >
            <h3 className='text-lg font-semibold'>Cookbook {i + 1}</h3>
            <p className='text-muted-foreground text-sm'>12 recipes</p>
          </div>
        ))}
      </div>
    </div>
  )
}
