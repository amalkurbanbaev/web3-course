import { MyOffersView } from "@/views/trade-erc-20/my-offers/my-offers-view"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/trade-erc-20/my-offers")({
  component: MyOffersView,
})
