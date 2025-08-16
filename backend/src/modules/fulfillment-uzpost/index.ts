import { Module } from "@medusajs/framework/utils"
import UzpostFulfillmentModuleService from "./service"

export const UZPOST_FULFILLMENT_MODULE = "fulfillment-uzpost"

export default Module(UZPOST_FULFILLMENT_MODULE, {
  service: UzpostFulfillmentModuleService,
})


