import type { tradeContractAbi } from "@/generated/wagmi.gen"
import type { AbiParametersToPrimitiveTypes, ExtractAbiFunction } from "abitype"

// Извлекаем описание функции
type Fn = ExtractAbiFunction<typeof tradeContractAbi, "getUserTrades">
// Получаем outputs вручную
type RawOutputs = Fn["outputs"] // это tuple[], как в ABI
// Преобразуем в типы
type Outputs = AbiParametersToPrimitiveTypes<RawOutputs>
// Это массив tuple[], берем элемент
export type TradeOffer = Outputs[0][number] & {
  id: string
}

// Извлекаем тип для метода получения деталей офера
type FnOfferDetails = ExtractAbiFunction<
  typeof tradeContractAbi,
  "getOfferDetails"
>

export type TradeOfferDetails = AbiParametersToPrimitiveTypes<
  FnOfferDetails["outputs"]
>
