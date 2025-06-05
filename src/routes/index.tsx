import { HomeView } from "@/views/home/home"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomeView,
})
