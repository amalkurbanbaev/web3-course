import { useNavigate } from "@tanstack/react-router"
import { FeatureCard } from "./feature-card.tsx"

export function SendErc20() {
  const navigate = useNavigate()

  return (
    <FeatureCard
      title="Send ERC-20"
      description={
        <>
          Send ERC-20 tokens quickly and without fees!
          <br />
          <br />
          Our product allows you to transfer any amount of tokens directly,
          without intermediaries or extra costs. Simply select the recipient,
          specify the amount, and your transaction is instantly completed.
          Convenient and secure asset management without limitations!
        </>
      }
      onButtonClick={() => {
        navigate({
          to: "/send-erc-20",
        })
      }}
      imageSrc="/paymentform.jpg"
      imagePosition="right"
      backgroundClassName="bg-gradient-to-b from-[#212121] to-[#141414]"
    />
  )
}
