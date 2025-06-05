import { DEFAULT_IMAGE_PATH } from "@/constants/placeholder-token"
import { MAIN_NET_ID } from "@/constants/tokens"
import type { Address } from "viem"
import { useChainId } from "wagmi"
import { useQuery } from "wagmi/query"

const getCoingeckoImage = (address: Address): Promise<string> =>
  fetch(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`,
  ).then((res) =>
    res.ok ? res.json().then(({ image }) => image.large) : DEFAULT_IMAGE_PATH,
  )

export default function useCoingeckoImageERC20(
  address: Address,
  enabled = false,
) {
  const chainId = useChainId()

  if (chainId !== MAIN_NET_ID) {
    return {
      data: DEFAULT_IMAGE_PATH,
      isSuccess: true,
      isLoading: false,
      isError: false,
      error: null,
    }
  }

  return useQuery<string, Error, string, string[]>({
    queryFn: () => getCoingeckoImage(address),
    queryKey: ["getImage", address],
    staleTime: Number.POSITIVE_INFINITY,
    enabled,
  })
}
