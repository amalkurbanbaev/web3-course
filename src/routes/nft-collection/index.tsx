import { NFTCollectionView } from "@/views/nft-collection/nft-collection"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/nft-collection/")({
  component: NFTCollectionView,
})
