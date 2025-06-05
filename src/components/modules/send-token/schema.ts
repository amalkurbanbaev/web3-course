import { isAddress } from "viem"
import type { Address } from "viem"
import { z } from "zod"

export const tokenSchema = z.object({
  address: z.string().refine((val) => isAddress(val), {
    message: "Invalid token address format",
  }) as z.ZodType<Address>,
  name: z.string().min(1, "Token name is required"),
  symbol: z.string().min(1, "Token symbol is required"),
  decimals: z
    .number()
    .int()
    .nonnegative("Decimals must be a non-negative integer"),
  image: z.string(),
})

export const schema = z.object({
  to: z.string().refine((val) => isAddress(val), {
    message: "Invalid wallet address format",
  }) as z.ZodType<Address>, // хотел заменить на addressSchema, но тс начал ругаться в форме добавления токенов, оставил так, запишу на техдолг:(
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => {
      const num = Number(val)
      return !Number.isNaN(num) && num > 0
    }, "Amount must be greater than 0")
    .refine((val) => {
      // Проверка на допустимое количество знаков после запятой
      const parts = val.split(".")
      return parts.length === 1 || parts[1]?.length <= 18
    }, "Too many decimal places"),
  token: tokenSchema,
})

export type SendTokenFormValues = z.infer<typeof schema>
