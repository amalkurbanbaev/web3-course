import { DialogContent } from "@/components/ui/dialog"
import type { Address } from "viem"
import type { Token, Tokens } from "@/types/token"
import type { ReactNode } from "react"
import Stage0 from "./stage-0"
import Stage1 from "./stage-1"
import Stage2 from "./stage-2"

type FormResolverProps = {
  children: ReactNode
  tokens: Tokens
  setAddress: (address: Address) => void
  close: () => void
  stage: number
  setStage2: (token: Token) => void
  setStage1: () => void
  address: Address
}

function FormResolver(props: FormResolverProps) {
  const {
    children,
    tokens,
    setStage1,
    setStage2,
    setAddress,
    stage,
    address,
    close,
  } = props

  switch (stage) {
    case 0:
      return (
        <Stage0 address={address} setAddress={setAddress} onClick={setStage1} />
      )
    case 1:
      return (
        <Stage1 address={address} onClick={setStage2}>
          {children}
        </Stage1>
      )
    case 2:
      return (
        <Stage2 name={tokens.get(address)?.name ?? "error"} onClick={close} />
      )
  }
}

function DialogInner(props: FormResolverProps) {
  return (
    <DialogContent className="size-[540px] p-8">
      <div className="grid grid-rows-[auto_1fr_auto_auto]">
        <FormResolver {...props} />
      </div>
    </DialogContent>
  )
}

export default DialogInner
