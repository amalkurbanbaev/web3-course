import type { router } from "@/components/providers/router-provider"

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
