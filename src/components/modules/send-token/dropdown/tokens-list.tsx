import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import type { Token, Tokens } from "@/types/token"
import { memo } from "react"
import type { Address } from "viem"

export type TokensListProps = {
  active: Token
  tokens: Tokens
  activate: (token: Token) => void
  remove: (address: Address) => void
  customTokens: Tokens
}

const TokensList = memo(
  ({ activate, active, tokens, remove, customTokens }: TokensListProps) =>
    [...tokens.entries()].map(([address, data]) => {
      const isCustomToken = customTokens.has(address)

      return (
        <div key={address} className="flex items-center justify-between">
          <DropdownMenuItem
            disabled={address === active.address}
            onClick={() => activate({ address, ...data })}
            className="flex-1"
          >
            <Avatar className="mr-2 size-6">
              <AvatarImage src={data.image} className="bg-black" />
            </Avatar>
            <span className="mr-1">{data.symbol}</span>
            {isCustomToken && (
              <span className="text-muted-foreground text-xs">(Custom)</span>
            )}
          </DropdownMenuItem>

          {isCustomToken && (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                remove(address)
              }}
              variant="ghost"
              size="sm"
              className="mr-2 h-8 w-8 p-0"
            >
              ✕
            </Button>
          )}
        </div>
      )
    }),
)

export default TokensList
