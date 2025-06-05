import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, polygonAmoy, sepolia } from "wagmi/chains"
import p from "../../package.json"

const config = getDefaultConfig({
  appName: p.name,
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [mainnet, polygonAmoy, sepolia],
  ssr: false,
})

export default config
