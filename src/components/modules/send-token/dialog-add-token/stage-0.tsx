import { DialogFooter } from "@/components/ui/dialog"
import Warning from "./alert"
import { Decimals, Name, AddressInput } from "./inputs"
import { Next } from "./buttons"
import type { Address } from "viem"
import { Header } from "./header"
import { useState } from "react"
import useDecimalsERC20 from "@/hooks/use-decimals-erc-20"
import useNameERC20 from "@/hooks/use-name-erc-20"
import { useAccount } from "wagmi"

type Stage0Props = {
  address: Address
  setAddress: (address: Address) => void
  onClick: () => void
}

export default function Stage0({ address, setAddress, onClick }: Stage0Props) {
  const [error, setError] = useState("")
  const decimals = useDecimalsERC20(address, !error && !!address)
  const { isLoading: isLoadingDecimals, error: errorDecimals } = decimals
  const name = useNameERC20(address, !error && !!address)
  const { isLoading: isLoadingName, error: errorName } = name

  const err = errorName?.message || errorDecimals?.message || error
  const { isConnected } = useAccount()

  return (
    <>
      <Header>Add a custom token</Header>
      <div className="flex flex-col gap-4">
        <Warning />
        <fieldset
          disabled={!isConnected}
          className="mb-6 grid grid-cols-4 self-end"
        >
          <AddressInput
            value={address}
            onChange={setAddress}
            error={err}
            setError={setError}
          />
          <Name {...name} />
          <Decimals {...decimals} />
        </fieldset>
      </div>
      <DialogFooter className="flex gap-4 self-end">
        <Next
          onClick={onClick}
          disabled={isLoadingName && isLoadingDecimals && !!error}
        >
          Next
        </Next>
      </DialogFooter>
    </>
  )
}
