import { Alert, AlertDescription } from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react"
import { useAccount } from "wagmi"

const CONNECT_WALLET =
  "Please connect your wallet to enable full access to the platform's features."
const SCAM_WARNING =
  "Anyone can create a token, including creating fake versions of existing tokens. Be aware of scams and security risks"

function Warning() {
  const { isConnected } = useAccount()
  return (
    <Alert>
      <TriangleAlert className="h-4 w-4" />
      <AlertDescription>
        {isConnected ? SCAM_WARNING : CONNECT_WALLET}
      </AlertDescription>
    </Alert>
  )
}

export default Warning
