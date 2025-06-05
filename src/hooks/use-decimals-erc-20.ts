import { useReadContract } from "wagmi"
import { type Address, erc20Abi as abi } from "viem"

export default function useDecimalsERC20(address?: Address, enabled = false) {
  return useReadContract({
    abi,
    address,
    functionName: "decimals",
    query: {
      enabled,
      staleTime: Number.POSITIVE_INFINITY,
    },
  })
}
