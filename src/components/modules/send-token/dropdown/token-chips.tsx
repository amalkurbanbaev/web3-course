import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Token, Tokens } from "@/types/token"
import { memo } from "react"
import type { Address } from "viem"

export type TokenChipsProps = {
  tokens: Tokens
  active: Token
  activate: (t: Token) => void
  onSelect: () => void
}

const TokenChips = memo(
  ({ tokens, active, activate, onSelect }: TokenChipsProps) => {
    const popularTokens = [...tokens.entries()].slice(0, 6)

    const handleSelectToken = (token: Token) => {
      activate(token)
      onSelect()
    }

    return (
      <div className="px-2 pb-3">
        <div className="mb-2 text-muted-foreground text-xs">Popular tokens</div>
        <div className="flex flex-wrap gap-2">
          {popularTokens.map(([address, data]) => (
            <Button
              key={address}
              onClick={() =>
                handleSelectToken({ address: address as Address, ...data })
              }
              disabled={address === active.address}
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${
                address === active.address
                  ? "bg-primary/20 text-primary"
                  : "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
              }`}
            >
              <Avatar className="size-5">
                <AvatarImage src={data.image} className="bg-black" />
              </Avatar>
              <span className="font-medium text-sm">{data.symbol}</span>
            </Button>
          ))}
        </div>
      </div>
    )
  },
)

export default TokenChips
