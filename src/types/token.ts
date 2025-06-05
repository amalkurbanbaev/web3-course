import type { Address } from "viem"

export type Token = {
  address: Address
  name: string
  symbol: string
  decimals: number
  image: string
}

export type TokenData = Omit<Token, "address">
export type Tokens = Map<Address, TokenData>

export type TokensByChain = Record<string, Tokens>
