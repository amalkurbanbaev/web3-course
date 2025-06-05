import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { Column } from "@tanstack/react-table"

export function Filter<TData>({ column }: { column: Column<TData, unknown> }) {
  const columnFilterValue = column.getFilterValue() as string
  const { filter } = column.columnDef.meta ?? {}

  return filter?.type === "select" ? (
    <Select
      onValueChange={(value) => {
        column.setFilterValue(value === "All" ? undefined : value)
      }}
      value={columnFilterValue ?? filter.options?.at(0)?.value}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={column.columnDef.header?.toString()} />
      </SelectTrigger>
      <SelectContent>
        {filter.options?.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : null
}
