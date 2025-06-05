import { TradeERC20Tabs } from "@/components/layouts/common/trade-erc-20-tabs"
import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/trade-erc-20")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <TradeERC20Tabs />
      <Outlet />
    </>
  )
}
