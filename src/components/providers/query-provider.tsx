import config from "@/lib/wagmi-config"
import { WalletNotConnectedError } from "@/types/errors"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { getAccount } from "@wagmi/core"
import type { ReactNode } from "react"
import { toast } from "sonner"

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (ctx) => {
        const { address } = getAccount(config)

        if (!address) {
          toast.warning("Connect your wallet")
          throw new WalletNotConnectedError()
        }

        return ctx
      },
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
