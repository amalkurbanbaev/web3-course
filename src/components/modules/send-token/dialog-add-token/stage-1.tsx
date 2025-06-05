import { DialogFooter } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import type { Token } from "@/types/token"
import type { ReactNode } from "react"
import type { Address } from "viem"
import { Next } from "./buttons"
import Warning from "./alert"
import Amount from "./amount"
import { Header } from "./header"
import useDecimalsERC20 from "@/hooks/use-decimals-erc-20"
import useCoingeckoImageERC20 from "@/hooks/use-coingecko-image-erc-20"
import useNameERC20 from "@/hooks/use-name-erc-20"
import useBalanceOfERC20 from "@/hooks/use-balance-of-erc-20"
import useSymbolERC20 from "@/hooks/use-symbol-erc-20"

type Stage1Props = {
  address: Address
  children: ReactNode
  onClick: (token: Token) => void
}
export default function Stage1({ children, onClick, address }: Stage1Props) {
  const {
    data: name,
    isLoading: isLoadingName,
    isError: isNameError,
    error: nameError,
  } = useNameERC20(address, true)
  const {
    data: symbol,
    isLoading: isLoadingSymbol,
    isError: isSymbolError,
    error: symbolError,
  } = useSymbolERC20(address, true)
  const {
    data: image,
    isLoading: isLoadingImage,
    isError: isImageError,
    error: imageError,
  } = useCoingeckoImageERC20(address, true)
  const {
    data: decimals,
    isLoading: isLoadingDecimals,
    isError: isDecimalsError,
    error: decimalsError,
  } = useDecimalsERC20(address, true)
  const {
    data: balanceOf,
    isLoading: isLoadingBalaceOf,
    isError: isBalanceOfError,
    error: balanceOfError,
  } = useBalanceOfERC20(address, true)

  const isLoading = [
    isLoadingName,
    isLoadingSymbol,
    isLoadingImage,
    isLoadingDecimals,
    isLoadingBalaceOf,
  ].some(Boolean)
  const isError = [
    isNameError,
    isBalanceOfError,
    isSymbolError,
    isImageError,
    isDecimalsError,
  ].some(Boolean)
  const errorMessage =
    [nameError, balanceOfError, symbolError, imageError, decimalsError].find(
      Boolean,
    )?.message ?? "Failed to fetch token data"

  const handleClick = () => {
    if (!isLoading && !isError && name && symbol && image && decimals)
      onClick({ name, symbol, image, decimals, address })
  }

  const isAmountValid =
    name &&
    symbol &&
    image &&
    decimals &&
    balanceOf !== null &&
    balanceOf !== undefined

  return (
    <>
      <Header>Add a custom token</Header>
      <div className="flex flex-col gap-4">
        <Warning />
        {isLoading ? (
          <Skeleton className="h-16 w-full" />
        ) : isAmountValid ? (
          <Amount
            name={name}
            symbol={symbol}
            image={image}
            decimals={decimals}
            balanceOf={balanceOf}
          />
        ) : (
          errorMessage
        )}
      </div>
      <DialogFooter className="flex gap-4 self-end">
        {children}
        <Next onClick={handleClick}>Next</Next>
      </DialogFooter>
    </>
  )
}
