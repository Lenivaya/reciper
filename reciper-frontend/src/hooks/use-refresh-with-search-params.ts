import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useRefreshWithSearchParams() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const refresh = useCallback(() => {
    const currentSearchParams = new URLSearchParams(searchParams.toString())
    const searchString = currentSearchParams.toString()
    const path = searchString ? `${pathname}?${searchString}` : pathname
    router.refresh()
    router.push(path)
  }, [router, searchParams, pathname])

  return refresh
}
