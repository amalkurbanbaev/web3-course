import { NftCollection, SendErc20, Stats, TradeErc20 } from "@/components/home/"
import { SupportedTokens } from "@/components/home/supported-tokens"
import { Button } from "@/components/ui/"

export function HomeView() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010514] to-background">
      <section className="fade-in container animate-in font-heading">
        <div className="container my-12 flex flex-col items-center justify-center gap-y-12">
          <h2 className="font-semibold text-4xl">
            Web3 platform for everything in crypto
          </h2>
          <Button asChild variant="secondary" size="lg">
            <a href="#trade-section">Start using now</a>
          </Button>
        </div>
      </section>
      <img className="mx-auto" src="/tokens.png" alt="tokens.png" />
      <section
        id="trade-section"
        className="container mx-auto mt-[72px] flex flex-col gap-[48px]"
      >
        <h3 className="justify-start text-center font-semibold text-3xl text-white">
          Products
        </h3>
        <SendErc20 />
        <TradeErc20 />
        <NftCollection />
      </section>
      <section className="container mx-auto mt-[72px] flex flex-col gap-[48px]">
        <h3 className="justify-start text-center font-semibold text-3xl text-white">
          Statistics
        </h3>
        <Stats />
      </section>

      <section className="container mx-auto mt-[144px] mb-60 flex flex-col items-center">
        <SupportedTokens />
      </section>
    </div>
  )
}
