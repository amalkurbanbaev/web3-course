import { DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function Header({ children }: { children: string }) {
  return (
    <DialogHeader className="mb-6">
      <DialogTitle>{children}</DialogTitle>
    </DialogHeader>
  )
}
