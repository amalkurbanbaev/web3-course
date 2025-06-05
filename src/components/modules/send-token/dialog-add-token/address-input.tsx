import { useState } from "react"
import addressSchema from "@/lib/schema-address"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { Address } from "viem"

type AddressInputProps = {
  value: Address
  onChange: (value: Address) => void
  error: string
  setError: (error: string) => void
}
const AddressInput = (props: AddressInputProps) => {
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
        <div className="h-5 text-red-500 text-sm">{error}</div>
      ) : (
        <div className="h-5" />
      )}
    </div>
  )
}

export default AddressInput
