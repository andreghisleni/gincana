import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface PaginationProps {
  pages: number
  items: number
  page: number
  limit: number
  showing: number
  handleUpdatePage: (page: number) => void
  handleChangeLimit: (limit: number) => void
}

export function Pagination({
  items,
  page,
  pages,
  limit,
  showing,
  handleUpdatePage,
  handleChangeLimit,
}: PaginationProps) {
  const firstPage = () => {
    handleUpdatePage(0)
  }

  const previousPage = () => {
    if (page - 1 < 0) {
      return
    }
    handleUpdatePage(page - 1)
  }

  const nextPage = () => {
    if (page + 1 > pages) {
      return
    }
    handleUpdatePage(page + 1)
  }

  const lastPage = () => {
    handleUpdatePage(pages)
  }

  const changeLimit = (value: string) => {
    handleChangeLimit(Number(value))
  }

  return (
    <div className="flex items-center justify-between text-wrap text-sm">
      <span>
        Showing {showing} of {items} items
      </span>
      <div className="flex items-center gap-8">
        <div className="flex w-auto items-center gap-2">
          <span className="whitespace-no-wrap">Rows per page</span>

          <div className="w-20">
            <Select value={String(limit)} onValueChange={changeLimit}>
              <SelectTrigger aria-label="Page">
                <SelectValue placeholder="Page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <span>
          Page {page} of {pages}
        </span>

        <div className="space-x-1.5">
          <Button onClick={firstPage} size="icon" disabled={page - 1 < 0}>
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button onClick={previousPage} size="icon" disabled={page - 1 < 0}>
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button onClick={nextPage} size="icon" disabled={page + 1 > pages}>
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button onClick={lastPage} size="icon" disabled={page + 1 > pages}>
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
