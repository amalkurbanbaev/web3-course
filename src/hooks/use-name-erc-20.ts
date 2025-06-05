import { type Address, erc20Abi as abi } from "viem"
import { useReadContract } from "wagmi"

export default function useNameERC20(address: Address, enabled = false) {
  return useReadContract({
    abi,
    address,
    functionName: "name",
    query: {
      enabled,
      staleTime: Number.POSITIVE_INFINITY,
    },
  })
}
