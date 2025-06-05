"use client"

import {
  type ColumnDef,
  type ColumnFilter,
  type ColumnFiltersState,
  type FilterFnOption,
  type RowSelectionState,
  type TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MAIN_NET_ID } from "@/constants/tokens"
import { getTokenMeta } from "@/lib/token"
import { cn } from "@/lib/utils"
import type { TradeOffer } from "@/types/offer"
import {
  type ComponentPropsWithoutRef,
  type Dispatch,
  type SetStateAction,
  useMemo,
  useState,
} from "react"
import useLocalStorage from "use-local-storage"
import { useAccount } from "wagmi"
import PageLoader from "../layouts/page-loader"
import { DataTableToolbar } from "../modules/data-table-toolbar"
import { Checkbox } from "./checkbox"

export type TableAction = ComponentPropsWithoutRef<"button">

interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  selectedRows: RowSelectionState
  setSelectedRows: Dispatch<SetStateAction<RowSelectionState>>
  actions?: TableAction[]
  onRowClick?: (rowId: string) => void
}

export function DataTable<TData extends { id: string }, TValue>({
  columns: rawColumns,
  data,
  isLoading,
  selectedRows,
  setSelectedRows,
  actions,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const { chainId } = useAccount()

  const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFilter[]>(
    "table-filters",
    [] as ColumnFilter[],
  )
  const [globalFilter, setGlobalFilter] = useState<string>("")

  const columns = useMemo<TableOptions<TData>["columns"]>(() => {
    const checkboxColumn: TableOptions<TData>["columns"][number] = {
      id: "select",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onClick={(e) => {
              e.stopPropagation()
            }}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }

    return [checkboxColumn, ...rawColumns]
  }, [rawColumns])

  const customGlobalFilter: FilterFnOption<TData> | undefined = (
    row,
    _columnId,
    filterValue,
  ) => {
    const offer = row.original as unknown as TradeOffer

    const idMatches = offer.id.toString().includes(filterValue)

    const tokenFromName =
      getTokenMeta(offer.tokenFrom, chainId || MAIN_NET_ID)?.name || ""
    const tokenToName =
      getTokenMeta(offer.tokenTo, chainId || MAIN_NET_ID)?.name || ""

    const tokenFromMatches = tokenFromName
      .toLowerCase()
      .includes(filterValue.toLowerCase())
    const tokenToMatches = tokenToName
      .toLowerCase()
      .includes(filterValue.toLowerCase())

    return idMatches || tokenFromMatches || tokenToMatches
  }

  const setSafeColumnFilters = (
    updater: SetStateAction<ColumnFiltersState>,
  ) => {
    if (typeof updater === "function") {
      // updater is a function like (prev) => next
      const fn = updater as (
        prevState: ColumnFiltersState,
      ) => ColumnFiltersState
      setColumnFilters((prev) => fn(prev ?? [])) // безопасно вызовем с дефолтным []
    } else {
      setColumnFilters(updater)
    }
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    state: {
      rowSelection: selectedRows,
      columnFilters: columnFilters,
      globalFilter: globalFilter,
    },
    globalFilterFn: customGlobalFilter,
    onRowSelectionChange: setSelectedRows,
    onColumnFiltersChange: setSafeColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
  })

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div className="flex h-full flex-col gap-1">
      <DataTableToolbar table={table} actions={actions} />

      <div className="fade-in h-full animate-in overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    onRowClick ? "cursor-pointer" : "cursor-default",
                  )}
                  onClick={() => {
                    onRowClick?.(row.id)
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
