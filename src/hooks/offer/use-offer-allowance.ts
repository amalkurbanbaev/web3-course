import { tradeContractAddress } from "@/generated/wagmi.gen"
import { type Address, erc20Abi } from "viem"
import { useAccount, useBalance, useChainId, useReadContract } from "wagmi"

// 1. Перед approve, нужно проверить - достаточно ли баланса у пользователя для совершения этого offer
// 2. Если баланса достаточно - проверить, выдан ли достаточный allowance
// 3. Если allowance не выдан - то запросить allowance

type Options = {
  tokenAddress?: Address // undefined => нативный токен
  requiredAmount?: bigint
  enabled: boolean
}

export const useOfferAllowance = ({
  tokenAddress,
  requiredAmount = 0n,
  enabled,
}: Options) => {
  const { address } = useAccount()
  const chainId = useChainId()

  const isNative = !tokenAddress
  const spender = chainId
    ? tradeContractAddress[chainId as keyof typeof tradeContractAddress]
    : undefined

  // === 1. Баланс ===
  const { data: nativeBalance, isLoading: nativeLoading } = useBalance({
    address: address,
    query: { enabled: enabled && isNative && !!address },
  })

  const { data: tokenBalance, isLoading: tokenLoading } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: enabled && !isNative && !!address && !!tokenAddress },
  })

  const balanceLoading = nativeLoading || tokenLoading
  const balance = isNative ? nativeBalance?.value : tokenBalance
  const sufficientBalance = (balance ?? 0n) >= requiredAmount

  // === 2. Allowance (только для ERC20 токенов) ===
  const { data: allowance = 0n, isLoading: allowanceLoading } = useReadContract(
    {
      abi: erc20Abi,
      functionName: "allowance",
      address: tokenAddress,
      args: !isNative && address && spender ? [address, spender] : undefined,
      query: {
        enabled:
          enabled && !isNative && sufficientBalance && !!address && !!spender,
      },
    },
  )

  // 3. Выводим необходимые флаги
  const sufficientAllowance = isNative || allowance >= requiredAmount
  const needsApproval = !isNative && sufficientBalance && !sufficientAllowance
  const canAcceptOffer = sufficientBalance && sufficientAllowance
  const isAllowanceChecking = balanceLoading || allowanceLoading

  return {
    sufficientBalance,
    sufficientAllowance,
    needsApproval,
    canAcceptOffer,
    isAllowanceChecking,
    isNative,
  }
}
