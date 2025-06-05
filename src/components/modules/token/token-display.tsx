import { DEFAULT_IMAGE_PATH } from "@/constants/placeholder-token"
import useDecimalsERC20 from "@/hooks/use-decimals-erc-20"
import useSymbolERC20 from "@/hooks/use-symbol-erc-20"
import { useTokenManagement } from "@/hooks/useTokenManagement"
import { type Address, formatUnits } from "viem"
import { useChainId } from "wagmi"

type TokenDisplayProps = {
  address?: Address
  amount?: bigint
}

export function TokenDisplay({
  address,
  amount = BigInt(0),
}: TokenDisplayProps) {
  const chainId = useChainId()
  const { allTokens } = useTokenManagement(chainId)

  const staticMeta = address ? allTokens.get(address) : undefined

  const { data: decimals } = useDecimalsERC20(
    address,
    Boolean(staticMeta?.decimals),
  )
  const { data: symbol } = useSymbolERC20(address, Boolean(staticMeta?.symbol))

  const finalDecimals = staticMeta?.decimals ?? decimals
  const finalSymbol = staticMeta?.symbol ?? symbol
  const finalImage = staticMeta?.image ?? DEFAULT_IMAGE_PATH

  const formatted = Number(
    formatUnits(amount, finalDecimals || 0),
  ).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6,
  })

  return (
    <div className="flex items-center gap-2">
      {finalImage && (
        <img src={finalImage} alt={finalSymbol} className="size-12" />
      )}
      <div className="flex flex-col justify-center">
        <span className="text-xl">{formatted}</span>
        <span className="text-muted-foreground text-sm">{finalSymbol}</span>
      </div>
    </div>
  )
}
