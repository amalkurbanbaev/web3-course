import { useTokenManagement } from "@/hooks/useTokenManagement"
import { formatRate } from "@/lib/token"
import type { Address } from "abitype"
import { erc20Abi as abi } from "viem"
import { useChainId, useReadContracts } from "wagmi"

type RateDisplayProps = {
  address1?: Address
  address2?: Address
  amount1?: bigint
  amount2?: bigint
}

export function RateDisplay({
  address1,
  address2,
  amount1,
  amount2,
}: RateDisplayProps) {
  const chainId = useChainId()
  const { allTokens } = useTokenManagement(chainId)

  const staticMeta1 = address1 ? allTokens.get(address1) : undefined
  const staticMeta2 = address2 ? allTokens.get(address2) : undefined

  const queryEnabled =
    Boolean(address1) &&
    Boolean(address2) &&
    Boolean(amount1) &&
    Boolean(amount2)

  const { data: decimals } = useReadContracts({
    contracts: [
      {
        abi,
        address: address1,
        functionName: "decimals",
      },
      {
        abi,
        address: address2,
        functionName: "decimals",
      },
    ],
    query: {
      enabled: queryEnabled,
      staleTime: Number.POSITIVE_INFINITY,
    },
  })

  const finalDecimals1 = staticMeta1?.decimals ?? decimals?.[0].result
  const finalDecimals2 = staticMeta2?.decimals ?? decimals?.[1].result

  const formattedRate = formatRate(
    amount1,
    amount2,
    finalDecimals1,
    finalDecimals2,
  )

  return (
    <div className="ml-auto flex flex-col rounded-md border p-2">
      <div className="text-lg">{formattedRate}</div>
      <div className="text-muted-foreground text-xs">Rate</div>
    </div>
  )
}
