import { Spinner } from "../ui/spinner"

export default function PageLoader({
  title = "Loading...",
}: {
  title?: string
}) {
  return (
    <div className="fade-in flex flex-1 animate-in items-center justify-center gap-2 p-2 text-2xl duration-500">
      <Spinner size="medium" />
      {title && (
        <div className="font-semibold text-muted-foreground text-sm">
          {title}
        </div>
      )}
    </div>
  )
}
