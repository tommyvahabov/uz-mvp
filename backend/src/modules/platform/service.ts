import { MedusaService } from "@medusajs/framework/utils"
import Shop from "./models/shop"

class PlatformModuleService extends MedusaService({
  Shop,
}) {}

export default PlatformModuleService


