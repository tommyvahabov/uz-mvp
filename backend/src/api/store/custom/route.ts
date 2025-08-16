import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
const PLATFORM_MODULE = "platform"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const platform: any = req.scope.resolve(PLATFORM_MODULE)
  const shopId = (req.query.shop_id as string) || ""
  if (!shopId) {
    return res.status(200).json({ message: "OK" })
  }
  const limit = (req.query.limit as string) || "20"
  const offset = (req.query.offset as string) || "0"
  const origin = `${req.protocol}://${req.headers.host}`
  const url = new URL(`${origin}/store/shops/${shopId}/products`)
  url.searchParams.set("limit", limit)
  url.searchParams.set("offset", offset)
  const response = await fetch(url.toString())
  const data = await response.json()
  res.status(response.status).json(data)
}
