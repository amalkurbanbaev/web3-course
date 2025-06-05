import { useNavigate } from "@tanstack/react-router"
import { FeatureCard } from "./feature-card.tsx"

export function TradeErc20() {
  const navigate = useNavigate()

  return (
    <FeatureCard
      title="Trade ERC-20"
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
      titleClassName="text-black"
      descriptionClassName="text-black"
      imageSrc="/newoffer.png"
      imagePosition="right"
      imgClassName="w-[576px] self-center"
      backgroundClassName="bg-[#FFD66C]"
      onButtonClick={() => {
        navigate({
          to: "/trade-erc-20",
        })
      }}
    />
  )
}
