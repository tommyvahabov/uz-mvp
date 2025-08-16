import { Module } from "@medusajs/framework/utils"
import ClickPaymentModuleService from "./service"

export const CLICK_PAYMENT_MODULE = "payment_click"

export default Module(CLICK_PAYMENT_MODULE, {
  service: ClickPaymentModuleService,
})


