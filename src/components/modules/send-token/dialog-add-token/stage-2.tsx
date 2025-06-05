import { DialogFooter } from "@/components/ui/dialog"
import { CircleCheckBig } from "lucide-react"
import { Next } from "./buttons"
import { Header } from "./header"

type FinalScreenP = {
  onClick: () => void
  name: string
}

export default function FinalScreen(props: FinalScreenP) {
  const { name, onClick } = props

  return (
    <>
      <Header>Successful import</Header>
      <div className="flex flex-col gap-4">
        <div className="flex h-full flex-col items-center justify-center gap-6">
          <CircleCheckBig className="size-22" />
          <p>
            <span className="uppercase">{name}</span> token has been added
          </p>
        </div>
      </div>
      <DialogFooter className="flex gap-4 self-end">
        <Next onClick={onClick}>Okey</Next>
      </DialogFooter>
    </>
  )
}
