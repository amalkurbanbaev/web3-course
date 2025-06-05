import { useReadContract } from "wagmi"
import { type Address, erc20Abi as abi } from "viem"

export default function useSymbolERC20(address?: Address, enabled = false) {
  return useReadContract({
    address: address,
    abi,
    functionName: "symbol",
    query: {
      enabled,
      staleTime: Number.POSITIVE_INFINITY,
    },
  })
}
