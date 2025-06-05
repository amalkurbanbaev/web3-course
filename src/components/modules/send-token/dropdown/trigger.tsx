import { AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Token } from "@/types/token"
import { Avatar } from "@radix-ui/react-avatar"

type TriggerProps = { active: Token; className?: string }
function Trigger({ active, className }: TriggerProps) {
  return (
    <DropdownMenuTrigger className={cn("flex items-center gap-1", className)}>
      <Avatar className="size-6">
        <AvatarImage src={active.image} className="bg-black" />
      </Avatar>
      <p>{active.symbol}</p>
      <p className="flex-1 px-4 text-right">v</p>
    </DropdownMenuTrigger>
  )
}

export default Trigger
