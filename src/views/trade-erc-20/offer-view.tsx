import PageLoader from "@/components/layouts/page-loader"
import { RateDisplay, TokenDisplay } from "@/components/modules/token"
import { Button } from "@/components/ui"
import { Alert, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  useOfferActions,
  useOfferAllowance,
  useOfferDetails,
} from "@/hooks/offer"
import { cn, getExplorerLink } from "@/lib/utils"
import { getRouteApi } from "@tanstack/react-router"
import {
  ArrowRightIcon,
  CheckIcon,
  ExternalLinkIcon,
  FuelIcon,
  MessageSquareWarning,
} from "lucide-react"
import { type ReactNode, useEffect } from "react"
import type { Address } from "viem"
import { useChainId } from "wagmi"

const routeApi = getRouteApi("/trade-erc-20/$offer/")

export function OfferView() {
  const params = routeApi.useParams()
  const chainId = useChainId()

  const {
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
    completed,
    detailsLoading,
    isNativeTokenTo,
    isUserOfferOwner,
    optionalTaker,
    isUserHasPermissionsToAcceptOffer,
  } = useOfferDetails(params.offer)

  const {
    step,
    setStep,
    txHash,
    infiniteApprove,
    setInfiniteApprove,
    handleApprove,
    handleAcceptTrade,
  } = useOfferActions({
    chainId,
    tokenTo,
    amountTo,
    offerId: params.offer,
  })

  const { sufficientBalance, isAllowanceChecking, canAcceptOffer } =
    useOfferAllowance({
      tokenAddress: isNativeTokenTo ? undefined : tokenTo,
      requiredAmount: amountTo,
      enabled: !completed && !isUserOfferOwner,
    })

  useEffect(() => {
    if (
      !isAllowanceChecking &&
      step === "idle" &&
      (canAcceptOffer || isNativeTokenTo)
    ) {
      setStep("approved")
    }
  }, [step, canAcceptOffer, isNativeTokenTo, setStep, isAllowanceChecking])

  const cardDescription =
    isUserOfferOwner || !isUserHasPermissionsToAcceptOffer
      ? "Offer exchange details:"
      : "You will have to sign 2 transactions: Approval of token & Accept Trade"

  if (detailsLoading || isAllowanceChecking) {
    return <PageLoader />
  }

  if (step === "accepted" || completed)
    return (
      <OfferComplete
        amountFrom={amountFrom}
        amountTo={amountTo}
        chainId={chainId}
        tokenFrom={tokenFrom}
        tokenTo={tokenTo}
        txHash={txHash}
      />
    )

  return (
    <section className="container">
      <Card className="m-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Offer ID #{params.offer}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {!sufficientBalance && !isUserOfferOwner ? (
            <Alert className="border-destructive text-destructive">
              <MessageSquareWarning className="h-4 w-4" />
              <AlertTitle>Insufficient balance!</AlertTitle>
            </Alert>
          ) : null}

          <div className="flex items-center gap-x-12">
            <div className="space-y-2">
              <div className="mb-1 font-medium text-muted-foreground text-sm">
                {isUserOfferOwner ? "You give" : "You get"}
              </div>
              <TokenDisplay address={tokenFrom} amount={amountFrom} />
            </div>

            <ArrowRightIcon className="mt-5" />

            <div className="space-y-2">
              <div className="mb-1 font-medium text-muted-foreground text-sm">
                {isUserOfferOwner ? "You want" : "You pay"}
              </div>
              <TokenDisplay address={tokenTo} amount={amountTo} />
            </div>

            <RateDisplay
              address1={tokenFrom}
              address2={tokenTo}
              amount1={amountFrom}
              amount2={amountTo}
            />
          </div>

          <div className="my-6 flex items-center gap-x-4">
            <div className="relative size-12">
              <ArrowRightIcon className="absolute inset-0 m-auto" />
            </div>
            <div className="flex flex-col">
              <div>{optionalTaker}</div>
              <div className="text-muted-foreground text-sm">Receiver</div>
            </div>
          </div>

          {isUserOfferOwner || !isUserHasPermissionsToAcceptOffer ? null : (
            <>
              <Separator />

              <div className="my-6 flex items-center gap-2 text-muted-foreground">
                <Checkbox
                  id="infinite-approve"
                  disabled={
                    step === "approved" ||
                    step === "approving" ||
                    step === "accepting" ||
                    !sufficientBalance
                  }
                  onCheckedChange={(v) => {
                    setInfiniteApprove(!!v)
                  }}
                  checked={infiniteApprove}
                />
                <Label htmlFor="infinite-approve">Infinite approve</Label>
              </div>

              <CardFooter className="flex-col px-0">
                <div className="flex items-center gap-x-2">
                  <Button
                    variant="secondary"
                    disabled={step !== "idle" || !sufficientBalance}
                    onClick={handleApprove}
                  >
                    {step === "approving" ? "Approving..." : "Approve Token"}
                  </Button>
                  <Button
                    variant="outline"
                    disabled={step !== "approved"}
                    onClick={handleAcceptTrade}
                  >
                    {step === "accepting" ? "Accepting..." : "Accept Trade"}
                  </Button>
                </div>

                <div className="my-4 flex w-full items-center justify-center">
                  <StepItem
                    active={step === "idle" || step === "approving"}
                    completed={step === "approved" || step === "accepting"}
                    step={1}
                  />
                  <Separator className="max-w-4" />
                  <StepItem
                    active={step === "approved" || step === "accepting"}
                    completed={false}
                    step={2}
                  />
                </div>

                <div className="flex w-full items-center justify-between text-muted-foreground text-sm">
                  <div>Gas Price</div>
                  <div className="flex items-center gap-1">
                    <FuelIcon className="size-4" /> ~ Gas will be calculated in
                    your wallet
                  </div>
                </div>
              </CardFooter>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

type StepItemProps = {
  step: number | ReactNode
  active: boolean
  completed: boolean
}
function StepItem({ step, active, completed }: StepItemProps) {
  return (
    <div
      className={cn(
        "flex size-5 shrink-0 flex-col items-center justify-center rounded-full border text-[10px] text-foreground",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "bg-transparent",
      )}
    >
      {completed ? <CheckIcon className="size-3" /> : step}
    </div>
  )
}

type OfferCompleteProps = {
  tokenFrom?: Address
  tokenTo?: Address
  amountFrom?: bigint
  amountTo?: bigint
  txHash?: `0x${string}`
  chainId: number
}

export function OfferComplete({
  tokenFrom,
  tokenTo,
  amountFrom,
  amountTo,
  txHash,
  chainId,
}: OfferCompleteProps) {
  return (
    <section className="container">
      <Card className="m-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Trade Complete</CardTitle>
          <CardDescription>
            <CardDescription>
              {txHash
                ? "You have successfully exchanged tokens"
                : "This offer has already been completed."}
            </CardDescription>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-x-6">
            <TokenDisplay address={tokenFrom} amount={amountFrom} />
            <ArrowRightIcon />
            <TokenDisplay address={tokenTo} amount={amountTo} />
            <RateDisplay
              address1={tokenFrom}
              address2={tokenTo}
              amount1={amountFrom}
              amount2={amountTo}
            />
          </div>

          {txHash ? (
            <>
              <Separator className="my-6" />
              <div className="flex items-center justify-between text-muted-foreground text-sm">
                <span>Transaction</span>
                <a
                  href={getExplorerLink(chainId, txHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  View on Explorer
                  <ExternalLinkIcon className="h-4 w-4" />
                </a>
              </div>
            </>
          ) : null}
        </CardContent>
      </Card>
    </section>
  )
}
