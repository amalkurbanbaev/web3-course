import { cn } from "@/lib/utils"
import { type VariantProps, cva } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import type React from "react"

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
})

const loaderVariants = cva("animate-spin text-inherit", {
  variants: {
    size: {
      small: "size-4",
      medium: "size-6",
      large: "size-8",
    },
  },
  defaultVariants: {
    size: "small",
  },
})

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string
  children?: React.ReactNode
}

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  )
}
