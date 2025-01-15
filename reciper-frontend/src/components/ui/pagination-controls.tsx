'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { useCallback } from 'react'

export interface PaginationControlsProps {
  /** Current active page number (1-based) */
  currentPage: number
  /** Total number of pages */
  totalPages: number
  /** Whether there is a next page available */
  hasNextPage: boolean
  /** Whether there is a previous page available */
  hasPreviousPage: boolean
  /** Maximum number of visible page buttons */
  maxVisiblePages?: number
  /** Additional URL parameters to include in pagination links */
  params?: Record<string, string>
  /** Custom class names for the pagination container */
  className?: string
  /** Whether to show the first/last page buttons */
  showFirstLast?: boolean
  /** Whether to show the ellipsis */
  showEllipsis?: boolean
  /** Custom labels for navigation buttons */
  labels?: {
    next?: string
    previous?: string
    first?: string
    last?: string
  }
  /** Callback for page changes - if provided, will use onClick instead of href */
  onPageChange?: (page: number) => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  maxVisiblePages = 5,
  params = {},
  className,
  showFirstLast = false,
  showEllipsis = true,
  labels = {
    next: 'Next',
    previous: 'Previous',
    first: 'First',
    last: 'Last'
  },
  onPageChange
}: PaginationControlsProps) {
  const createPageUrl = useCallback(
    (pageNum: number) => {
      const searchParams = new URLSearchParams({
        ...params,
        page: String(pageNum)
      })
      return `?${searchParams.toString()}`
    },
    [params]
  )

  const handlePageClick = useCallback(
    (pageNum: number, event?: React.MouseEvent) => {
      if (onPageChange) {
        event?.preventDefault()
        onPageChange(pageNum)
      }
    },
    [onPageChange]
  )

  const getVisiblePages = useCallback(() => {
    const pages: (number | 'ellipsis')[] = []
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // First page
    if (showFirstLast && startPage > 1) {
      pages.push(1)
      if (showEllipsis && startPage > 2) pages.push('ellipsis')
    }

    // Visible pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Last page
    if (showFirstLast && endPage < totalPages) {
      if (showEllipsis && endPage < totalPages - 1) pages.push('ellipsis')
      pages.push(totalPages)
    }

    return pages
  }, [currentPage, totalPages, maxVisiblePages, showFirstLast, showEllipsis])

  const renderPageLink = useCallback(
    (page: number, isActive: boolean) => {
      const props = onPageChange
        ? {
            onClick: (e: React.MouseEvent) => handlePageClick(page, e),
            href: createPageUrl(page)
          }
        : { href: createPageUrl(page) }

      return (
        <PaginationLink {...props} isActive={isActive}>
          {page}
        </PaginationLink>
      )
    },
    [createPageUrl, handlePageClick, onPageChange]
  )

  if (totalPages <= 1) return null

  return (
    <Pagination className={cn('select-none', className)}>
      <PaginationContent>
        {hasPreviousPage && (
          <>
            {showFirstLast && currentPage > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={createPageUrl(1)}
                  onClick={(e) => handlePageClick(1, e)}
                >
                  {labels.first}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationPrevious
                href={createPageUrl(currentPage - 1)}
                onClick={(e) => handlePageClick(currentPage - 1, e)}
              >
                {labels.previous}
              </PaginationPrevious>
            </PaginationItem>
          </>
        )}

        {getVisiblePages().map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              renderPageLink(page, page === currentPage)
            )}
          </PaginationItem>
        ))}

        {hasNextPage && (
          <>
            <PaginationItem>
              <PaginationNext
                href={createPageUrl(currentPage + 1)}
                onClick={(e) => handlePageClick(currentPage + 1, e)}
              >
                {labels.next}
              </PaginationNext>
            </PaginationItem>
            {showFirstLast && currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  href={createPageUrl(totalPages)}
                  onClick={(e) => handlePageClick(totalPages, e)}
                >
                  {labels.last}
                </PaginationLink>
              </PaginationItem>
            )}
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}
