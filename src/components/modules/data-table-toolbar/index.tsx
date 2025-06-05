import { Button } from "@/components/ui"
import type { TableAction } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import type { Table } from "@tanstack/react-table"
import { SearchIcon, XIcon } from "lucide-react"
import { Filter } from "../table-filter"

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  actions?: TableAction[]
}

export function DataTableToolbar<TData>({
  table,
  actions = [],
}: DataTableToolbarProps<TData>) {
  const columns = table.getAllColumns()
  const isFiltered = table.getState().columnFilters.length

  const resetFilters = () => {
    table.setColumnFilters([])
  }

  return (
    <div className="flex h-14 items-center gap-2.5">
      {columns.map((c) => (
        <Filter key={c.id} column={c} />
      ))}

      {isFiltered ? (
        <Button size="sm" variant="ghost" onClick={resetFilters}>
          <XIcon className="size-4" />
          Reset
        </Button>
      ) : null}

      <div className="ml-auto flex gap-x-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="rounded-md first:ml-auto"
            {...action}
          >
            {action.children}
          </Button>
        ))}
      </div>

      <div className={cn("relative", actions?.length === 0 && "ml-auto")}>
        <Input
          className="w-full max-w-60 pl-8"
          placeholder="Offer ID or Asset"
          value={table.getState().globalFilter}
          onChange={(e) => {
            table.setGlobalFilter(e.target.value)
          }}
        />

        <SearchIcon className="absolute inset-y-0 left-3 size-3.5 h-full text-input" />
      </div>
    </div>
  )
}
