import { RainbowKitProvider as RKP, darkTheme } from "@rainbow-me/rainbowkit"
import type { PropsWithChildren } from "react"

export function RainbowKitProvider({ children }: PropsWithChildren) {
  return <RKP theme={darkTheme()}>{children}</RKP>
}
