import "@tanstack/react-table"

import type { RowData } from "@tanstack/react-table"

interface SelectFilterOption {
  type: "select"
  options?: {
    value: string | number
    label: string
  }[]
}

export type FilterOption = SelectFilterOption

declare module "@tanstack/react-table" {
  // biome-ignore lint/correctness/noUnusedVariables: https://tanstack.com/table/latest/docs/api/core/column-def
  interface ColumnMeta<TData extends RowData, TValue> {
    filter?: FilterOption
  }
}
