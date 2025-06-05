import { OffersHistoryView } from "@/views/trade-erc-20/offers-history-view"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/trade-erc-20/offers-history")({
  component: OffersHistoryView,
})
