import { Navigate, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/trade-erc-20/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <Navigate to="/trade-erc-20/my-offers" />
}
