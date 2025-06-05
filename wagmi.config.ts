import { defineConfig } from "@wagmi/cli"
import { etherscan, react } from "@wagmi/cli/plugins"
import { polygonAmoy, sepolia } from "wagmi/chains"

export default defineConfig({
  out: "src/generated/wagmi.gen.ts",
  plugins: [
    etherscan({
      // biome-ignore lint/style/noNonNullAssertion: we must have api key to use wagmi generator
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: "TradeContract",
          address: {
            [sepolia.id]: "0x48aAc2068D5BA2424d8244A5C4577f13b49D6abC",
            [polygonAmoy.id]: "0x89CA69458f187085C10B87D94A8C60a6461F0068",
          },
        },
      ],
    }),
    react(),
  ],
})
