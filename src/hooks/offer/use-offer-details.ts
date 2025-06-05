import { DEFAULT_TOKEN_ADDRESS } from "@/constants/tokens"
import { useReadTradeContractGetOfferDetails } from "@/generated/wagmi.gen"
import { useTokenManagement } from "@/hooks/useTokenManagement"
import { parseOfferDetails } from "@/lib/token"
import { useAccount, useChainId } from "wagmi"

const EMPTY_OPTIONAL_TAKER_ADDRESS = DEFAULT_TOKEN_ADDRESS

// Этот хук используется для:
// 1. чтения сырых данных об офере из контракта
// 2. перевод сырых данных в структуру объекта (вместо сырого кортежа)
// 3. вывод некоторых полезных флагов
export function useOfferDetails(offerId: string) {
  const chainId = useChainId()
  const { address: userAddress, chain } = useAccount()
  const { allTokens } = useTokenManagement(chainId)

  const { data: offerDetailsRaw, isLoading: detailsLoading } =
    useReadTradeContractGetOfferDetails({
      args: [BigInt(offerId)],
    })

  const parsed = parseOfferDetails(offerDetailsRaw)

  const {
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
    optionalTaker,
    completed,
    creator,
  } = parsed

  const isUserOfferOwner = creator === userAddress
  const isUserHasPermissionsToAcceptOffer =
    optionalTaker === userAddress ||
    optionalTaker === EMPTY_OPTIONAL_TAKER_ADDRESS

  const tokenToSymbol = tokenTo ? allTokens.get(tokenTo)?.symbol : undefined
  // сомнительная проверка на нативный токен
  const isNativeTokenTo = chain?.nativeCurrency.symbol === tokenToSymbol

  return {
    detailsLoading,
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
    optionalTaker,
    completed,
    creator,
    isUserOfferOwner,
    isNativeTokenTo,
    isUserHasPermissionsToAcceptOffer,
  }
}
