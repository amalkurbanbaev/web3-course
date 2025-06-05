import { DEFAULT_TOKEN, TOKENS_MAP } from "@/constants/tokens"
import useLocalTokens from "@/hooks/use-local-tokens"
import type { Token, Tokens } from "@/types/token"
import { useState } from "react"
import { type Address, getAddress } from "viem"

export function useTokenManagement(chainId: number) {
  const [activeToken, setActiveToken] = useState<Token>(DEFAULT_TOKEN)
  const [localTokens, addToken, deleteToken] = useLocalTokens()

  const basicTokens = TOKENS_MAP[chainId]
  const allTokens: Tokens = new Map(
    [
      ...Array.from(basicTokens.entries()),
      ...Array.from(localTokens.entries()),
    ].map(([address, token]) => [getAddress(address), token]),
  )
  const removeToken = (address: Address) => {
    if (activeToken.address === address) setActiveToken(DEFAULT_TOKEN)
    deleteToken(address)
  }

  return {
    localTokens,
    basicTokens,
    allTokens,
    addToken,
    removeToken,
  }
}
