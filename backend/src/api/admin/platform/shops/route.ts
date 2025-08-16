import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PlatformModuleService from "../../../modules/platform/service"
import { PLATFORM_MODULE } from "../../../modules/platform"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const shops = await platform.listShops()
  res.json({ shops })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const { name, handle, description, default_currency, country_code, is_active } = req.body || {}
  const shop = await platform.createShops({
    name,
    handle,
    description,
    default_currency,
    country_code,
    is_active,
  })
  res.status(201).json({ shop: shop[0] })
}


