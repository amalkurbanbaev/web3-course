import { useAccount, useReadContract } from "wagmi"
import { type Address, erc20Abi as abi } from "viem"

export default function useBalanceOfERC20(address: Address, enabled = false) {
  const { address: addressUser } = useAccount()

  if (!addressUser) {
    return {
      data: null,
      error: Error("No addressUser provided"),
      isError: true,
      isSuccess: false,
      isLoading: false,
    }
  }

  return useReadContract({
    address: address,
    abi,
    functionName: "balanceOf",
    args: [addressUser],
    query: {
      enabled,
      staleTime: 10000,
    },
  })
}
