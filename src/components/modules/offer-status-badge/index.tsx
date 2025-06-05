import { Badge } from "@/components/ui/badge"
import { getStatusText } from "@/lib/utils"
import type { TradeOffer } from "@/types/offer"
import type { Address } from "viem"

type OfferStatusBadgeProps = {
  offer?: TradeOffer
  address?: Address
}

const statusVariants: Record<
  string,
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "positive"
  | null
  | undefined
> = {
  "For me": "default",
  Open: "secondary",
  Completed: "positive",
  Canceled: "destructive",
  "-": "outline",
}

export function OfferStatusBadge({ offer, address }: OfferStatusBadgeProps) {
  const status = getStatusText(offer, address)

  return <Badge variant={statusVariants[status]}>{status}</Badge>
}
