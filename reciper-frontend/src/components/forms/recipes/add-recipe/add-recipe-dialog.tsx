'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { AddRecipeForm } from './add-recipe'

export function AddRecipeDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size='lg'
          className='fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg'
        >
          <Plus className='h-6 w-6' />
          <span className='sr-only'>Add new recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='text-2xl'>Create New Recipe</DialogTitle>
        </DialogHeader>
        <AddRecipeForm
          onSuccess={() => {
            setIsOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
