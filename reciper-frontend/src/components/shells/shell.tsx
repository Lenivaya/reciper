import { cn } from '@/lib/utils'

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'sidebar'
}

export function Shell({
  children,
  variant = 'default',
  className,
  ...props
}: ShellProps) {
  return (
    <div
      className={cn(
        'grid items-start gap-8 px-4 py-6',
        {
          container: variant === 'default',
          'container-xl': variant === 'sidebar'
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
