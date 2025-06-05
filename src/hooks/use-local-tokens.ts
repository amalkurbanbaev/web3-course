import { AMOY, MAIN_NET_ID, SEPOLIA } from "@/constants/tokens"
import type { Token, TokenData, TokensByChain } from "@/types/token"
import useLocalStorage from "use-local-storage"
import type { Address } from "viem"
import { useChainId } from "wagmi"

const serializer = (value?: TokensByChain) =>
  value
    ? JSON.stringify(
        Object.fromEntries(
          Object.entries(value).map(([chain, map]) => [
            chain,
            [...map.entries()],
          ]),
        ),
      )
    : ""

const parser = (str: string): TokensByChain =>
  Object.fromEntries(
    Object.entries(JSON.parse(str)).map(([chain, entries]) => [
      chain,
      new Map(entries as Readonly<[Address, TokenData]>[]),
    ]),
  )

const options = { serializer, parser }

function useLocalTokens() {
  const chainId = useChainId()
  const [tokens, setTokens] = useLocalStorage<TokensByChain>(
    "tokens",
    Object.fromEntries(
      [MAIN_NET_ID, SEPOLIA, AMOY].map((net) => [net, new Map()]),
    ),
    options,
  )

  const addToken = ({ address, ...rest }: Token) =>
    setTokens((prev) => {
      if (!prev) return

      const current = prev[chainId]

      const updated = new Map(current)
      updated.set(address, rest)
      return { ...prev, [chainId]: updated }
    })

  const removeToken = (address: Address) => {
    setTokens((prev) => {
      if (!prev) return

      const current = prev[chainId]
      if (!current.has(address)) return prev

      const updated = new Map(current)
      updated.delete(address)
      return { ...prev, [chainId]: updated }
    })
  }

  return [tokens[chainId], addToken, removeToken] as const
}

export default useLocalTokens
