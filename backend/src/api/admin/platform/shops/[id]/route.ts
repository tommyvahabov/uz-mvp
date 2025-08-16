import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PlatformModuleService from "../../../../modules/platform/service"
import { PLATFORM_MODULE } from "../../../../modules/platform"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const shop = await platform.retrieveShop(req.params.id)
  res.json({ shop })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const shop = await platform.updateShops(req.params.id, req.body)
  res.json({ shop: shop[0] })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  await platform.deleteShops(req.params.id)
  res.sendStatus(204)
}


