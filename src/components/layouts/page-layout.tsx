import { cn } from "@/lib/utils"
import { useMatchRoute } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { Toaster } from "../ui/sonner"
import { Header } from "./header"

export function PageLayout({ children }: { children: ReactNode }) {
  const isHomePage = useMatchRoute()({ to: "/" })

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main
        className={cn("flex flex-1 flex-col", !isHomePage && "overflow-hidden")}
      >
        {children}
      </main>

      <Toaster />
    </div>
  )
}
