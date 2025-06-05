import type { TokenData } from "@/types/token"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { formatUnits } from "viem"

const Amount = (token: TokenData & { balanceOf: bigint }) => (
  <div className="grid grid-cols-[min-content_1fr] gap-x-1">
    <Avatar className="row-span-2 size-12">
      <AvatarImage src={token.image} className="bg-black" />
    </Avatar>
    <p className="col-start-2 text-xl uppercase">{token.name}</p>
    <p className="col-start-2 text-muted-foreground text-sm">
      {`${formatUnits(token.balanceOf, token.decimals)} ${token.symbol}`}
    </p>
  </div>
)

export default Amount
