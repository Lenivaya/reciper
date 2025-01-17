'use client'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useMediaQuery } from 'usehooks-ts'

const sidebarVariants = cva(
  'relative flex-col bg-card transition-all duration-300 ease-in-out data-[expanded=false]:w-16 data-[expanded=true]:w-64',
  {
    variants: {
      variant: {
        default: 'fixed left-0 top-28 flex h-[calc(100vh-7rem)] border-r',
        modal: 'hidden'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

interface SidebarContextValue {
  expanded: boolean
  setExpanded: (expanded: boolean) => void
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue>({
  expanded: true,
  setExpanded: () => undefined,
  isModalOpen: false,
  setIsModalOpen: () => undefined
})

export function useSidebarContext() {
  return React.useContext(SidebarContext)
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultExpanded?: boolean
}

export function SidebarProvider({
  children,
  defaultExpanded = true
}: SidebarProviderProps) {
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  React.useEffect(() => {
    if (isDesktop) {
      setIsModalOpen(false)
    }
  }, [isDesktop])

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        setExpanded,
        isModalOpen,
        setIsModalOpen
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {}

export function Sidebar({ className, variant, ...props }: SidebarProps) {
  const { expanded, isModalOpen, setIsModalOpen } = useSidebarContext()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (!isDesktop && variant === 'default') {
    return (
      <Drawer open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DrawerContent className='h-[85vh]'>
          <div
            className={cn(
              sidebarVariants({ variant: 'modal' }),
              'flex h-full w-full flex-col',
              className
            )}
            {...props}
          />
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <div
      data-expanded={expanded}
      className={cn(sidebarVariants({ variant }), className)}
      {...props}
    />
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({
  className,
  children,
  ...props
}: SidebarHeaderProps) {
  const { expanded } = useSidebarContext()

  return (
    <div
      data-expanded={expanded}
      className={cn(
        'flex h-14 items-center overflow-hidden border-b px-4 transition-all duration-300',
        'data-[expanded=false]:justify-center data-[expanded=true]:justify-between',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({
  className,
  children,
  ...props
}: SidebarTriggerProps) {
  const { expanded, setExpanded, setIsModalOpen } = useSidebarContext()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (!isDesktop) {
    return (
      <Button
        variant='ghost'
        size='icon'
        className={className}
        onClick={() => setIsModalOpen(true)}
        {...props}
      >
        {children}
        <span className='sr-only'>Toggle Menu</span>
      </Button>
    )
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className={className}
      onClick={() => setExpanded(!expanded)}
      {...props}
    >
      {children}
      <span className='sr-only'>Toggle Menu</span>
    </Button>
  )
}

interface SidebarInsetProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarInset({
  className,
  children,
  ...props
}: SidebarInsetProps) {
  const { expanded } = useSidebarContext()

  return (
    <div
      data-expanded={expanded}
      className={cn(
        'transition-all duration-300 ease-in-out',
        'ml-16 data-[expanded=true]:ml-64',
        'pt-28',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
