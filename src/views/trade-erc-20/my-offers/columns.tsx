import type { ColumnDef } from "@tanstack/react-table"

import { OfferStatusBadge } from "@/components/modules/offer-status-badge"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { MAIN_NET_ID, SEPOLIA } from "@/constants/tokens"
import { useTokenManagement } from "@/hooks/useTokenManagement"
import {
  formatRate,
  formatTokenAmount,
  getTokenMeta,
  shortenAddress,
} from "@/lib/token"
import { getStatusText } from "@/lib/utils"
import type { TradeOffer } from "@/types/offer"
import { type Address, getAddress } from "viem"
import { useChainId } from "wagmi"

export const createOfferColumns = (
  chainId?: number,
  address?: Address,
): ColumnDef<TradeOffer>[] => [
  {
    accessorKey: "id",
    header: "Offer ID",
    cell: ({ getValue }) => `${getValue()}`,
  },
  {
    accessorKey: "tokenFrom",
    header: "From Asset 1",
    cell: ({ row }) => <TokenTable address={row.original.tokenFrom} />,
  },
  {
    accessorKey: "tokenTo",
    header: "To Asset 2",
    cell: ({ row }) => <TokenTable address={row.original.tokenTo} />,
  },
  {
    accessorKey: "amountFrom",
    header: "Amount 1",
    cell: ({ row }) => {
      const { amountFrom, tokenFrom } = row.original

      const tokenMeta = getTokenMeta(tokenFrom, chainId || MAIN_NET_ID)
      const amount = formatTokenAmount(amountFrom, tokenMeta?.decimals)

      return amount
    },
  },
  {
    accessorKey: "amountTo",
    header: "Amount 2",
    cell: ({ row }) => {
      const { amountTo, tokenTo } = row.original

      const tokenMeta = getTokenMeta(tokenTo, chainId || MAIN_NET_ID)
      const amount = formatTokenAmount(amountTo, tokenMeta?.decimals)

      return amount
    },
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => {
      const { amountFrom, amountTo, tokenFrom, tokenTo } = row.original

      const tokenFromMeta = getTokenMeta(tokenFrom, chainId || MAIN_NET_ID)
      const tokenToMeta = getTokenMeta(tokenTo, SEPOLIA)

      const fromDecimals = tokenFromMeta?.decimals ?? 18
      const toDecimals = tokenToMeta?.decimals ?? 18

      const rateStr = formatRate(amountFrom, amountTo, fromDecimals, toDecimals)

      return <span>{rateStr}</span>
    },
  },
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => {
      return <OfferStatusBadge offer={row.original} address={address} />
    },
    filterFn: (row, _columnId, filterValue) => {
      const offer = row.original
      const status = getStatusText(offer, address)

      if (filterValue === "All") return true
      return status === filterValue
    },
    meta: {
      filter: {
        type: "select",
        options: [
          {
            label: "All",
            value: "All",
          },
          {
            label: "Open",
            value: "Open",
          },
          {
            label: "For me",
            value: "For me",
          },
        ],
      },
    },
  },
  {
    accessorKey: "optionalTaker",
    header: "Receiver",
    cell: ({ row }) => {
      const isZeroAddress = getTokenMeta(
        row.original.optionalTaker,
        chainId || MAIN_NET_ID,
      )
      if (isZeroAddress) return "-"
      return shortenAddress(row.original.optionalTaker)
    },
  },
]

function TokenTable({ address }: { address: Address }) {
  const chainId = useChainId()
  const { allTokens } = useTokenManagement(chainId)
  const tokenMeta = allTokens.get(getAddress(address))

  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-4">
        <AvatarImage src={tokenMeta?.image} alt={tokenMeta?.name} />
      </Avatar>

      <div>{tokenMeta?.name}</div>
    </div>
  )
}
