import { Button } from "@/components/ui"
import { useAccount } from "wagmi"
import { useIsFetching } from "@tanstack/react-query"
import type { ComponentProps } from "react"

export function useIsLoading() {
  return !!useIsFetching({
    predicate: (query) => query.state.status === "pending",
  })
}

export function Back({ onClick }: { onClick: () => void }) {
  const { isConnected } = useAccount()
  const isSubmitting = useIsLoading()

  return (
    <Button
      onClick={onClick}
      disabled={!isConnected || isSubmitting}
      type="button"
      className="flex-1"
    >
      Back
    </Button>
  )
}

type NextProps = {
  children: string
  onClick: () => void
} & ComponentProps<"button">

export function Next({ children, onClick, ...p }: NextProps) {
  const { isConnected } = useAccount()
  const isSubmitting = useIsLoading()

  return (
    <Button
      {...p}
      onClick={onClick}
      disabled={p.disabled || !isConnected || isSubmitting}
      className="flex-1"
    >
      {children}
    </Button>
  )
}
