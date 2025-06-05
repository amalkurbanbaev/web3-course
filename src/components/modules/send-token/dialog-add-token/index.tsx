import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import type { Token, Tokens } from "@/types/token"
import { useState } from "react"
import DialogInner from "./dialog-inner"
import { Back } from "./buttons"
import type { Address } from "viem"

export type DialogAddTokenProps = {
  tokens: Tokens
  activate: (token: Token) => void
  add: (token: Token) => void
}

function DialogAddToken({ activate, tokens, add }: DialogAddTokenProps) {
  const [open, setOpen] = useState(false)
  const [address, setAddress] = useState<Address>("" as Address)
  const [stage, setStage] = useState(0)

  const close = () => setOpen(false)
  const reset = () => {
    setAddress("" as Address)
    setStage(0)
  }
  const back = () => {
    setStage((prev) => {
      if (prev === 1) return 0
      return prev - 1
    })
  }

  const setStage1 = () => {
    const prev = tokens.get(address)
    if (prev) {
      activate({ address, ...prev })
      return setStage(2)
    }

    return setStage(1)
  }

  const setStage2 = (token: Token) => {
    activate(token)
    add(token)
    setStage(2)
  }

  const onOpenChange = (open: boolean) => {
    if (open && stage === 2) reset()
    setOpen(open)
  }

  const props = {
    setAddress,
    address,
    stage,
    setStage2,
    setStage1,
    tokens,
    close,
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="xs">
          + Add a custom token
        </Button>
      </DialogTrigger>
      <DialogInner {...props}>
        <Back onClick={back} />
      </DialogInner>
    </Dialog>
  )
}

export default DialogAddToken
