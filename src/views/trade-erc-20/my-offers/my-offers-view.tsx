import { DataTable } from "@/components/ui/data-table"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  useReadTradeContractGetOptionalTakerTrades,
  useReadTradeContractGetUserTrades,
} from "@/generated/wagmi.gen"
import type { TradeOffer } from "@/types/offer"
import { useNavigate } from "@tanstack/react-router"
import type { RowSelectionState } from "@tanstack/react-table"
import { XIcon } from "lucide-react"
import { useMemo, useState } from "react"
import type { Address } from "viem"
import { useAccount, useChainId } from "wagmi"
import { createOfferColumns } from "./columns"

export function MyOffersView() {
  const { address } = useAccount()
  const chainId = useChainId()
  const navigate = useNavigate()

  const queryOptions = {
    enabled: !!address,
    select: (data?: readonly Omit<TradeOffer, "id">[]) =>
      data?.filter((entry) => entry.completed === false),
  }

  const queryArgs: readonly [Address] | undefined = address
    ? [address]
    : undefined

  const { data: userOffers, isLoading: isUserOffersLoading } =
    useReadTradeContractGetUserTrades({
      // functionName: "getUserTrades",
      args: queryArgs,
      query: queryOptions,
    })

  const { data: takerOffers, isLoading: isTakerOffersLoading } =
    useReadTradeContractGetOptionalTakerTrades({
      // functionName: "getOptionalTakerTrades",
      args: queryArgs,
      query: queryOptions,
    })

  // еще можно сделать так, пока не знаю какой вариант лучше
  // заметных преимуществ по стилю кода не увидел, но название хука манит использовать именно его
  // при этом, сгенерированные хуки кажутся более готовыми к использованию
  // const contractAddress = chainId ? getTradeContractAddress(chainId) : undefined
  // const { data: allOffers } = useReadContracts({
  //   contracts: [
  //     {
  //       ...tradeContractConfig,
  //       functionName: "getUserTrades",
  //       args: queryArgs,
  //       address: contractAddress,
  //     },
  //     {
  //       ...tradeContractConfig,
  //       functionName: "getOptionalTakerTrades",
  //       args: queryArgs,
  //       address: contractAddress,
  //     },
  //   ],
  //   query: {
  //     select: ([usersOffers, takerOffers]) =>
  //       [...(usersOffers.result || []), ...(takerOffers.result || [])].filter(
  //         (offer) => offer.active,
  //       ),
  //   },
  // })

  const offers = useMemo(
    () =>
      [...(userOffers || []), ...(takerOffers || [])]
        .filter((trade) => trade.active)
        .map((trade) => {
          return {
            ...trade,
            id: trade.tradeID.toString(),
          }
        }),
    [userOffers, takerOffers],
  )

  const columns = useMemo(
    () => createOfferColumns(chainId, address),
    [chainId, address],
  )

  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({})
  const selectedOfferId = Object.keys(selectedRows).at(0)

  const [showCancelOfferDialog, setShowCancelOfferDialog] = useState(false)

  const toggleShowCancelOfferDialog = () =>
    setShowCancelOfferDialog((prev) => !prev)

  return (
    <section className="container mb-14 flex h-full flex-1 flex-col overflow-hidden rounded-lg bg-muted/50 p-4">
      <h1 className="mb-4 p-1 font-semibold text-xl">My offers</h1>

      <div className="relative flex h-full grow flex-col overflow-hidden p-1">
        <DataTable
          onRowClick={(id) => {
            navigate({
              to: "/trade-erc-20/$offer",
              params: { offer: id },
            })
          }}
          isLoading={isUserOffersLoading || isTakerOffersLoading}
          columns={columns}
          data={offers}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          actions={[
            {
              id: "cancel-offer",
              onClick: toggleShowCancelOfferDialog,
              disabled: !selectedOfferId,
              children: (
                <span className="flex items-center gap-2">
                  <XIcon />
                  Cancel offer
                </span>
              ),
            },
          ]}
        />
      </div>

      <AlertDialog
        onOpenChange={toggleShowCancelOfferDialog}
        open={showCancelOfferDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
