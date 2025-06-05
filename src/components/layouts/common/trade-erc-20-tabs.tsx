import { Button } from "@/components/ui"
import { TRADE_ERC_20_TABS } from "@/constants/links-config"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"

export function TradeERC20Tabs() {
  return (
    <div className="mb-12 w-full bg-background/50">
      <nav className="container flex w-full items-center gap-x-4 py-4">
        {TRADE_ERC_20_TABS.map((tab, idx) => (
          <Button
            asChild
            key={tab.to}
            variant={idx === TRADE_ERC_20_TABS.length - 1 ? "outline" : "ghost"}
            size="sm"
            className={cn(
              "text-muted-foreground opacity-100 last-of-type:ml-auto [&.active]:bg-primary [&.active]:text-foreground",
            )}
          >
            <Link to={tab.to}>
              {tab.icon && <tab.icon className="size-4" />}
              {tab.title}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  )
}
