import DialogAddToken from "@/components/modules/send-token/dialog-add-token"
import Dropdown from "@/components/modules/send-token/dropdown"
import { Button, Spinner } from "@/components/ui"
import { Input } from "@/components/ui/input.tsx"

import { useTokenManagement } from "@/hooks/useTokenManagement.ts"
import type { Token } from "@/types/token.ts"

export interface TokenInputProps {
  amount: string
  setAmount: (value: string) => void
  token: Token
  setToken: (token: Token) => void
  formattedBalance?: string
  chainId: number
  isLoading: boolean
}

function TokenInput({
  amount,
  setAmount,
  token,
  setToken,
  formattedBalance,
  chainId,
  isLoading,
}: TokenInputProps) {
  const { localTokens, basicTokens, allTokens, addToken, removeToken } =
    useTokenManagement(chainId)

  return (
    <div className="grid w-[640px] grid-flow-col grid-cols-[1fr_200px] grid-rows-2 gap-x-2 gap-y-4 rounded-xl bg-[#515151] px-6 py-4">
      <Input
        placeholder="0"
        value={amount}
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        className="rounded-lg bg-[#3A3A3A] px-4 py-3 text-white text-xl"
      />
      <div className="flex flex-row items-center gap-[8px]">
        <div className="flex items-center text-white">
          Balance:
          {isLoading ? <Spinner size="small" /> : ` ${formattedBalance || 0}`}
        </div>
        <Button size="sm" onClick={() => setAmount(formattedBalance || "")}>
          Max
        </Button>
      </div>
      <Dropdown
        className="w-full self-center"
        tokens={localTokens}
        active={token}
        activate={setToken}
        remove={removeToken}
        basic={basicTokens}
      />
      <DialogAddToken tokens={allTokens} add={addToken} activate={setToken} />
    </div>
  )
}

export default TokenInput
