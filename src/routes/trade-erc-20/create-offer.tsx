import { CreateOfferView } from "@/views/trade-erc-20/create-offers-view"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/trade-erc-20/create-offer")({
  component: CreateOfferView,
})
