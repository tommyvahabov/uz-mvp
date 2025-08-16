import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import PlatformModuleService from "../../../../../modules/platform/service"
import { PLATFORM_MODULE } from "../../../../../modules/platform"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const [items, count] = await platform.listAndCountShopSalesChannels({ shop_id: req.params.id })
  res.json({ items, count })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const { sales_channel_id } = req.body || {}
  if (!sales_channel_id) {
    return res.status(400).json({ message: "'sales_channel_id' is required" })
  }
  const item = await platform.attachSalesChannel(req.params.id, sales_channel_id)
  res.status(201).json({ item })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const platform: PlatformModuleService = req.scope.resolve(PLATFORM_MODULE)
  const { sales_channel_id } = req.query
  if (!sales_channel_id || typeof sales_channel_id !== "string") {
    return res.status(400).json({ message: "'sales_channel_id' query is required" })
  }
  await platform.detachSalesChannel(req.params.id, sales_channel_id)
  res.sendStatus(204)
}


