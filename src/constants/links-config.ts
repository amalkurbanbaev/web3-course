import type { LinkOptions } from "@tanstack/react-router"
import {
  CoinsIcon,
  HistoryIcon,
  type LucideIcon,
  PlusCircleIcon,
} from "lucide-react"

type LinkType = {
  to: LinkOptions["to"]
  title: string
  icon?: LucideIcon
}

export const HEADER_LINKS: LinkType[] = [
  {
    to: "/send-erc-20",
    title: "Send ERC-20",
  },
  {
    to: "/trade-erc-20",
    title: "Trade ERC-20",
  },
  {
    to: "/nft-collection",
    title: "NFT Collection",
  },
] as const

export const TRADE_ERC_20_TABS: LinkType[] = [
  { to: "/trade-erc-20/my-offers", title: "My offers", icon: CoinsIcon },
  {
    to: "/trade-erc-20/offers-history",
    title: "History",
    icon: HistoryIcon,
  },
  {
    to: "/trade-erc-20/create-offer",
    title: "Create offer",
    icon: PlusCircleIcon,
  },
]
