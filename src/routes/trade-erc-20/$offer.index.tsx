import { OfferView } from "@/views/trade-erc-20/offer-view"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/trade-erc-20/$offer/")({
  component: OfferView,
})
