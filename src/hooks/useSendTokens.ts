import { DEFAULT_TOKEN_ADDRESS } from "@/constants/tokens.ts"
import { type Address, parseUnits } from "viem"
import { erc20Abi } from "viem"
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi"

export function useSendToken({
  to,
  amount,
  token,
}: {
  to: Address
  amount: string
  token: {
    address?: Address
    decimals: number
  }
}) {
  const isNativeToken =
    !token.address || token.address === DEFAULT_TOKEN_ADDRESS

  const {
    writeContract,
    isPending: isWritePending,
    error: writeError,
    data: txHash,
  } = useWriteContract()

  const {
    sendTransaction,
    isPending: isSendPending,
    error: sendError,
    data: nativeTxHash,
  } = useSendTransaction()

  const finalTxHash = txHash || nativeTxHash
  const {
    isLoading: isWaiting,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: finalTxHash,
  })

  const isPending = isWritePending || isSendPending || isWaiting
  const error = writeError || sendError || receiptError
  const errorMessage = error
    ? error instanceof Error
      ? error.message
      : String(error)
    : null

  const send = async () => {
    try {
      if (isNativeToken) {
        sendTransaction({
          to,
          value: parseUnits(amount, token.decimals),
        })
      } else if (token.address) {
        writeContract({
          address: token.address,
          abi: erc20Abi,
          functionName: "transfer",
          args: [to, parseUnits(amount, token.decimals)],
        })
      }
      return true
    } catch (e) {
      console.error("Error sending tokens:", e)
      return false
    }
  }

  return {
    send,
    isPending,
    isSuccess,
    error: errorMessage,
    txHash: finalTxHash,
  }
}
