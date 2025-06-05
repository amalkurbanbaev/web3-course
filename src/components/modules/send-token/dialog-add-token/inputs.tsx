import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type useDecimalsERC20 from "@/hooks/use-decimals-erc-20"
import type useNameERC20 from "@/hooks/use-name-erc-20"
import type { Address } from "viem"
import { PLACEHOLDER_TOKEN } from "@/constants/placeholder-token"
import addressSchema from "@/lib/schema-address"
import { useState } from "react"

export function Decimals(props: ReturnType<typeof useDecimalsERC20>) {
  const decimals = props.data ?? PLACEHOLDER_TOKEN.decimals

  return (
    <div className="col-span-1 mb-6 flex flex-col gap-2">
      <Label htmlFor="decimals" className="text-right">
        Token decimal
      </Label>
      <Input
        readOnly
        id="decimals"
        value={props.isLoading ? "loading..." : decimals?.toString()}
        className="col-span-3 uppercase opacity-50 focus:ring-0"
      />
    </div>
  )
}

export function Name(props: ReturnType<typeof useNameERC20>) {
  const name = props.data ?? PLACEHOLDER_TOKEN.name

  return (
    <>
      <div className="col-span-4 mb-6 flex flex-col gap-2">
        <Label htmlFor="name" className="text-right">
          Token name
        </Label>
        <Input
          readOnly
          id="name"
          value={props.isLoading ? "loading..." : name?.toString()}
          className="col-span-3 uppercase opacity-50 focus:ring-0"
        />
      </div>
    </>
  )
}

type AddressInputProps = {
  value: Address
  onChange: (value: Address) => void
  error: string
  setError: (error: string) => void
}
export const AddressInput = (props: AddressInputProps) => {
  const { value, onChange, error, setError } = props

  const [touched, setTouched] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value
    onChange(nextValue as Address)
    if (!addressSchema.safeParse(nextValue).success) {
      setError("Invalid address")
    } else {
      setError("")
    }
  }

  const handleBlur = () => {
    setTouched(true)
    if (!addressSchema.safeParse(value).success) {
      setError("Invalid address")
    } else {
      setError("")
    }
  }

  return (
    <div className="col-span-4 mb-3 flex flex-col">
      <Label className="mb-2">Token contract address</Label>
      <Input
        className={`border ${error && touched ? "border-red-500" : "border-gray-300"} rounded px-3 py-2`}
        placeholder="0x50327C6C5A14dCADE707aBAD2e27EB517DF87ab5"
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {error && touched ? (
        <div className="h-5 overflow-hidden text-ellipsis whitespace-nowrap text-red-500 text-sm">
          {error}
        </div>
      ) : (
        <div className="h-5" />
      )}
    </div>
  )
}
