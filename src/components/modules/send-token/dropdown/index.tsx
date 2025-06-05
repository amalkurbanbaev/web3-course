import {
  DropdownMenu,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input.tsx"
import type { Token, Tokens } from "@/types/token"
import { useState } from "react"
import type { Address } from "viem"
import TokenChips from "./token-chips"
import TokensList from "./tokens-list"
import Trigger from "./trigger"

export type DropdownProps = {
  active: Token
  activate: (token: Token) => void
  remove: (address: Address) => void
  tokens: Tokens
  basic: Tokens
}

function Dropdown(props: DropdownProps & { className?: string }) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const allTokens = new Map([
    ...props.basic.entries(),
    ...props.tokens.entries(),
  ])

  const filtered = Array.from(allTokens.entries()).filter(
    ([_, token]) =>
      token.symbol.toLowerCase().includes(query.toLowerCase()) ||
      token.name.toLowerCase().includes(query.toLowerCase()),
  )

  const filteredTokens = new Map(filtered)

  const handleTokenSelect = () => {
    setIsOpen(false)
  }

  const handleActivateFromList = (token: Token) => {
    props.activate(token)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <Trigger active={props.active} className={props.className} />
      <DropdownMenuContent>
        <div className="px-2 pb-2 font-semibold text-lg text-white">
          Select a token
        </div>

        <div className="px-2 pb-2">
          <Input
            placeholder="Search asset or paste address"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full bg-[#2A2A2A] px-4 py-2 text-white placeholder:text-[#888]"
          />
        </div>

        {query === "" && (
          <TokenChips
            tokens={props.basic}
            active={props.active}
            activate={props.activate}
            onSelect={handleTokenSelect}
          />
        )}

        <TokensList
          tokens={filteredTokens}
          active={props.active}
          activate={handleActivateFromList}
          remove={props.remove}
          customTokens={props.tokens}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Dropdown
