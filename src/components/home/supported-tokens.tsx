import {
  LANDING_PAGE_TOKENS,
  MAIN_NET_ID,
  TOKENS_MAP,
} from "@/constants/tokens"
import { WalletNotConnectedError } from "@/types/errors"
import type { Token } from "@/types/token"
import { Link } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"
import { toast } from "sonner"
import { useAccount, useWatchAsset } from "wagmi"
import { Button, Spinner } from "../ui"

export function SupportedTokens() {
  const { chain } = useAccount()

  const chainId = chain?.id ?? MAIN_NET_ID

  const { watchAssetAsync, isPending, variables, reset } = useWatchAsset()

  const handleWatchAsset = async (token: Token) => {
    try {
      await watchAssetAsync({
        type: "ERC20",
        options: token,
      })
      toast.success("The token was successfully added")
    } catch (error) {
      if (error instanceof WalletNotConnectedError) {
        return
      }

      if (error instanceof Error) {
        if (error.message.includes("rejected")) reset()
        else
          toast.error("Couldn't add the token", {
            description: "Please, try again later",
          })
      }
    }
  }

  const tokensByChain = TOKENS_MAP[chainId]

  const sortedTokens = [...tokensByChain.entries()]
    .filter(([_, meta]) => LANDING_PAGE_TOKENS.includes(meta.symbol))
    .sort(([_addressA, metaA], [_addressB, metaB]) =>
      metaA.symbol.localeCompare(metaB.symbol),
    )

  return (
    <>
      <h3 className="justify-start text-center font-semibold text-3xl text-white">
        Supported ERC-20 tokens
      </h3>

      {sortedTokens.length ? (
        <div className="mt-12 grid max-w-[1200px] grid-cols-2">
          <div className="flex flex-col justify-between gap-6">
            <div className="grid h-fit grid-cols-2 items-center gap-6">
              {sortedTokens.map(([address, meta]) => (
                <SupportedTokenButton
                  key={address}
                  meta={meta}
                  isLoading={
                    isPending && variables?.options?.address === address
                  }
                  disabled={isPending}
                  onClick={() => {
                    handleWatchAsset({ ...meta, address })
                  }}
                />
              ))}
            </div>

            <p>Or any other ERC-20 token of yours</p>
          </div>

          <img
            src="/supported-tokens.png"
            alt="supported tokens"
            className="rounded-lg"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mt-14 flex w-full flex-col items-center justify-center gap-1">
          <div>No supported tokens found on {chain?.name} :(</div>
          <Button asChild variant="link">
            <Link to="/send-erc-20">
              You can try add the token of this network here
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}

type SupportedTokenButtonProps = ComponentPropsWithoutRef<"button"> & {
  meta: Omit<Token, "address">
  isLoading?: boolean
}

function SupportedTokenButton({
  meta,
  isLoading,
  ...rest
}: SupportedTokenButtonProps) {
  const { image, symbol } = meta

  return (
    <Button
      variant="ghost"
      className="flex w-40 items-center justify-center p-0 font-heading font-normal text-base opacity-100"
      {...rest}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <span className="inline-flex w-full items-center gap-x-2">
            <img
              src={image}
              alt={symbol}
              width={32}
              height={32}
              className="rounded-full"
            />
            {symbol}
          </span>

          <span className="group flex size-8 shrink-0 flex-col items-center justify-center rounded bg-primary text-foreground hover:bg-primary/80">
            <PlusIcon className="size-6 group-hover:scale-105" />
          </span>
        </>
      )}
    </Button>
  )
}
