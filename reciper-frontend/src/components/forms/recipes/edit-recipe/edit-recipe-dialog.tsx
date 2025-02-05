'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Pencil } from 'lucide-react'
import { Suspense, useState } from 'react'
import { EditRecipeForm } from './edit-recipe'

interface EditRecipeDialogProps {
  recipeId: string
}

export function EditRecipeDialog({ recipeId }: EditRecipeDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='absolute top-2 right-12 h-8 w-8 rounded-full bg-white/80 p-0 text-blue-600 opacity-90 shadow-xs backdrop-blur-xs hover:bg-blue-100 hover:text-blue-700'
        >
          <Pencil className='h-4 w-4' />
          <span className='sr-only'>Edit recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Edit Recipe</DialogTitle>
        </DialogHeader>
        <Suspense>
          <EditRecipeForm
            recipeId={recipeId}
            onSuccess={() => {
              setIsOpen(false)
            }}
          />
        </Suspense>
      </DialogContent>
    </Dialog>
  )
}
