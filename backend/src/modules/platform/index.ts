import PlatformModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const PLATFORM_MODULE = "platform"

export default Module(PLATFORM_MODULE, {
  service: PlatformModuleService,
})


