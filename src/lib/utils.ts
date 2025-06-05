import type { TradeOffer } from "@/types/offer"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Address } from "viem"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusText(offer?: TradeOffer, address?: Address): string {
  if (!offer) return "-"

  if (offer.active) {
    if (offer.optionalTaker === address) return "For me"
    if (!offer.completed) return "Open"
  }

  if (!offer.active) {
    return offer.completed ? "Completed" : "Canceled"
  }

  return "-"
}

export function getExplorerLink(chainId: number, txHash: string) {
  const explorers: Record<number, string> = {
    1: "https://etherscan.io/tx/",
    11155111: "https://sepolia.etherscan.io/tx/",
    80002: "https://amoy.polygonscan.com/tx/",
  }

  return `${explorers[chainId] ?? "https://etherscan.io/tx/"}${txHash}`
}
