import { Module } from "@medusajs/framework/utils"
import PaymePaymentModuleService from "./service"

export const PAYME_PAYMENT_MODULE = "payment-payme"

export default Module(PAYME_PAYMENT_MODULE, {
  service: PaymePaymentModuleService,
})


