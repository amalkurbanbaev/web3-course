import {
  tradeContractAddress,
  useWriteTradeContractTake,
} from "@/generated/wagmi.gen"
import { useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { type Address, erc20Abi, maxUint256 } from "viem"
import { useAccount, usePublicClient, useWriteContract } from "wagmi"

type Step = "idle" | "approving" | "approved" | "accepting" | "accepted"

type UseOfferActionsProps = {
  chainId: number
  tokenTo?: Address
  amountTo?: bigint
  offerId: string
}

export function useOfferActions({
  chainId,
  tokenTo,
  amountTo,
  offerId,
}: UseOfferActionsProps) {
  const queryClient = useQueryClient()

  const { address: userAddress } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()
  const { writeContractAsync: takeOffer } = useWriteTradeContractTake()

  const [step, setStep] = useState<Step>("idle")
  const [txHash, setTxHash] = useState<Address>()
  const [infiniteApprove, setInfiniteApprove] = useState(false)

  // 1. хэндлер для аппрува
  const handleApprove = useCallback(async () => {
    setStep("approving")
    try {
      const approveAmount = infiniteApprove ? maxUint256 : amountTo
      const spender =
        tradeContractAddress[chainId as keyof typeof tradeContractAddress]

      if (!spender || !approveAmount || !tokenTo || !userAddress) return

      const hash = await writeContractAsync({
        abi: erc20Abi,
        functionName: "approve",
        address: tokenTo,
        args: [spender, approveAmount],
      })

      const approvingPromise = publicClient?.waitForTransactionReceipt({ hash })

      // если promise не создался, то не продолжаем
      if (!approvingPromise) {
        return toast.error("Cannot request approve", {
          description: "Please, try again later",
        })
      }

      toast.promise(approvingPromise, {
        loading: "Waiting for approval confirmation...",
        success: "Successfully approved",
        error: "Approval transaction failed",
      })

      await approvingPromise

      const allowance = await publicClient?.readContract({
        address: tokenTo,
        abi: erc20Abi,
        functionName: "allowance",
        args: [userAddress, spender],
      })

      if (
        allowance !== undefined &&
        amountTo !== undefined &&
        allowance >= amountTo
      ) {
        setStep("approved")
      } else {
        toast.error("Insufficient balance for exchange")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong during token approve")
      setStep("idle")
    }
  }, [
    amountTo,
    chainId,
    infiniteApprove,
    publicClient,
    tokenTo,
    userAddress,
    writeContractAsync,
  ])

  // 2. хэндлер для принятия оффера
  const handleAcceptTrade = useCallback(async () => {
    setStep("accepting")
    toast.dismiss()

    if (!publicClient) return toast.error("No public client!")

    try {
      const hash = await takeOffer({
        args: [BigInt(offerId)],
      })

      const waitPromise = publicClient.waitForTransactionReceipt({ hash })
      toast.promise(waitPromise, {
        loading: "Waiting for confirmation...",
        success: "Offer successfully accepted!",
        error: "Transaction failed",
      })

      await waitPromise

      await queryClient.invalidateQueries({
        queryKey: ["offerDetails", offerId],
      })

      setTxHash(hash)
      setStep("accepted")
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong during offer acceptance")
      setStep("approved")
    }
  }, [offerId, publicClient, queryClient, takeOffer])

  return {
    step,
    setStep,
    txHash,
    infiniteApprove,
    setInfiniteApprove,
    handleApprove,
    handleAcceptTrade,
  }
}
