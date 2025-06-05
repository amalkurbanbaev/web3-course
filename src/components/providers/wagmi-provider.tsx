import config from "@/lib/wagmi-config"
import type { ReactNode } from "react"
import { WagmiProvider as WP } from "wagmi"

interface Web3ProviderProps {
  children: ReactNode
}

export function WagmiProvider({ children }: Web3ProviderProps) {
  return <WP config={config}>{children}</WP>
}
