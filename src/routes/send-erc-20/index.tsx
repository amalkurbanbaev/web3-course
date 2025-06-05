import SendTokenView from "@/views/send-erc-20/send-erc-20"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/send-erc-20/")({
  component: SendTokenView,
})
