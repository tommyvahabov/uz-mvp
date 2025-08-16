import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PlatformModuleService from "../../../../../modules/platform/service"
import { PLATFORM_MODULE } from "../../../../../modules/platform"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const [items, count] = await platform.listAndCountShopProducts({ shop_id: req.params.id })
  res.json({ items, count })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const { product_id } = req.body || {}
  if (!product_id) {
    return res.status(400).json({ message: "'product_id' is required" })
  }
  const item = await platform.attachProduct(req.params.id, product_id)
  res.status(201).json({ item })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const { product_id } = req.query
  if (!product_id || typeof product_id !== "string") {
    return res.status(400).json({ message: "'product_id' query is required" })
  }
  await platform.detachProduct(req.params.id, product_id)
  res.sendStatus(204)
}


