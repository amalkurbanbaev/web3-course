import { MAIN_NET_ID, TOKENS_MAP } from "@/constants/tokens"
import type { TradeOfferDetails } from "@/types/offer"
import type { TokenData, Tokens, TokensByChain } from "@/types/token"
import { type Address, formatUnits } from "viem"

/**
 * Сокращает Ethereum-адрес до формата 0x1234...abcd
 */
export function shortenAddress(address: string, length = 4): string {
  if (!address) return ""
  return `${address.slice(0, 2 + length)}...${address.slice(-length)}`
}

/**
 * Форматирует BigInt значение токена в строку с учётом decimals
 */
export function formatTokenAmount(
  value?: bigint,
  decimals = 18,
  precision = 6,
): string {
  if (!value) return "-"
  const float = Number.parseFloat(formatUnits(value, decimals))
  return float.toFixed(precision)
}

/**
 * Расчёт отношения обмениваемых токенов
 */
export function formatRate(
  amountFrom?: bigint,
  amountTo?: bigint,
  decimalsFrom?: number,
  decimalsTo?: number,
  digits = 6,
): string {
  if (
    amountFrom == null ||
    amountTo == null ||
    decimalsFrom == null ||
    decimalsTo == null
  ) {
    return "-"
  }

  const fromFloat = Number(formatUnits(amountFrom, decimalsFrom))
  const toFloat = Number(formatUnits(amountTo, decimalsTo))

  if (fromFloat === 0) return "∞"

  const rate = toFloat / fromFloat

  return rate.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  })
}

/**
 * Получает локальные токены из localStorage и парсит в Map
 */
function getLocalTokens(): TokensByChain {
  try {
    const raw = localStorage.getItem("tokens")
    if (!raw) return { [MAIN_NET_ID]: new Map() }

    const parsed: TokensByChain = JSON.parse(raw)
    const tokensByChain: TokensByChain = {}

    for (const [chainId, tokenObj] of Object.entries(parsed)) {
      const tokenMap = new Map<Address, TokenData>(
        Object.entries(tokenObj) as [Address, TokenData][],
      )
      tokensByChain[chainId] = tokenMap
    }

    return tokensByChain
  } catch {
    return { [MAIN_NET_ID]: new Map() }
  }
}

/**
 * Получает метаданные токена по адресу и chainId
 */
export function getTokenMeta(
  address?: Address,
  chainId?: number,
): TokenData | undefined {
  if (!address || !chainId) return

  const localTokensByChain = getLocalTokens()
  const localTokens = localTokensByChain[chainId] ?? new Map()
  const constantTokens = TOKENS_MAP[chainId] ?? new Map()

  const all: Tokens = new Map([
    ...constantTokens.entries(),
    ...localTokens.entries(),
  ])

  return all.get(address)
}

/**
 * Формирование полей для деталей оффера
 */

export function parseOfferDetails(offer?: TradeOfferDetails) {
  return {
    tokenFrom: offer?.[0],
    tokenTo: offer?.[1],
    amountFrom: offer?.[2],
    amountTo: offer?.[3],
    creator: offer?.[4],
    fee: offer?.[5],
    optionalTaker: offer?.[6],
    active: offer?.[7],
    completed: offer?.[8],
  }
}
