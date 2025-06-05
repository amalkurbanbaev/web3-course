import { isAddress } from "viem"
import { z } from "zod"

const addressSchema = z
  .string()
  .refine((value: string) => isAddress(value), { message: "Invalid address" })

export default addressSchema
