import TokenInput from "@/components/modules/send-token/token-input"
import { Button } from "@/components/ui"
import { Form, FormField } from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input"
import { DEFAULT_TOKEN, DEFAULT_TOKEN_ADDRESS } from "@/constants/tokens"
import { useSendToken } from "@/hooks/useSendTokens.ts"
import type { Token } from "@/types/token"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { Address } from "viem"
import { useAccount, useBalance, useChainId } from "wagmi"
import { type SendTokenFormValues, schema } from "./schema"

function SendTokenInner({ chainId }: { chainId: number }) {
  const { address: paymentAddress } = useAccount()

  const form = useForm<SendTokenFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      to: "" as Address,
      amount: "",
      token: DEFAULT_TOKEN,
    },
    mode: "all",
  })

  const {
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = form

  const amount = watch("amount")
  const to = watch("to")
  const token = watch("token")
  const { send, error } = useSendToken({
    to: to as Address,
    amount,
    token,
  })

  const {
    data: balance,
    refetch,
    isLoading,
  } = useBalance({
    address: paymentAddress,
    ...(token.address !== DEFAULT_TOKEN_ADDRESS
      ? { token: token.address as Address }
      : {}),
    chainId,
  })

  const handleSubmitForm = async () => {
    const ok = await send() // isSubmitSuccessful не сработал
    await refetch()
    if (ok) {
      reset({
        to: "" as Address,
        amount: "",
        token: token,
      })
    }
  }
  const setAmount = (value: string) =>
    setValue("amount", value, { shouldValidate: true })

  const setActiveToken = (token: Token) => {
    setValue("token", token, { shouldValidate: true })
  }

  const isButtonDisabled = isSubmitting || !isValid

  const renderErrors = () => (
    <>
      {errors?.to?.message && (
        <p className="mt-1 text-red-500 text-sm">{errors.to.message}</p>
      )}
      {errors?.amount?.message && (
        <p className="mt-1 text-red-500 text-sm">{errors.amount.message}</p>
      )}
      {errors?.token?.message && (
        <p className="mt-1 text-red-500 text-sm">{errors.token.message}</p>
      )}
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </>
  )

  return (
    <Form {...form}>
      <form className="justife-center mx-auto flex w-[740px] flex-col items-center gap-4 rounded-xl bg-[#333] p-4">
        <TokenInput
          amount={amount}
          token={token}
          setAmount={setAmount}
          setToken={setActiveToken}
          formattedBalance={balance?.formatted}
          chainId={chainId}
          isLoading={isLoading}
        />
        <FormField
          control={control}
          name="to"
          render={({ field }) => (
            <div className="w-[640px] rounded-xl bg-[#515151]">
              <Input
                placeholder="0x0000000000000000000000000000000000000000"
                {...field}
              />
            </div>
          )}
        />
        {renderErrors()}
        <Button
          size="lg"
          variant="outline"
          className="w-[640px]"
          type="button"
          disabled={isButtonDisabled}
          onClick={form.handleSubmit(handleSubmitForm)}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </form>
    </Form>
  )
}

function SendToken() {
  const chainId = useChainId()

  return <SendTokenInner chainId={chainId} key={chainId} />
}

export default SendToken
