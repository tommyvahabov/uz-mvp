import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

const PLATFORM_MODULE = "platform"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const platform: any = req.scope.resolve(PLATFORM_MODULE)
  const handle = req.params.handle
  const [shops] = await platform.listAndCountShops({ handle }, { take: 1, skip: 0 })
  const shop = shops[0]
  if (!shop) return res.status(404).json({ message: "Shop not found" })
  res.json({ shop })
}


