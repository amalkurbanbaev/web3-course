import { useNavigate } from "@tanstack/react-router"
import { FeatureCard } from "./feature-card.tsx"

export function NftCollection() {
  const navigate = useNavigate()

  return (
    <FeatureCard
      title="Nft collection"
      description={
        <>
          Token exchange made simple and secure!
          <br />
          <br />
          Create and accept token exchange offers with other users. Specify
          which tokens you want to give and receive, and choose the recipient.
          Tokens are stored in a smart contract until the transaction is
          complete. Trade tokens with minimal fees and full transparency!
        </>
      }
      imageSrc="/nft.png"
      backgroundClassName="bg-[#2D4BC1]"
      onButtonClick={() => {
        navigate({
          to: "/nft-collection",
        })
      }}
    />
  )
}
