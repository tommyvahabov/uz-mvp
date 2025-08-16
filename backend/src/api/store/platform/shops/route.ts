import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

const PLATFORM_MODULE = "platform"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  if (process.env.DISABLE_ADMIN_AUTH !== 'true') {
    return res.status(403).json({ message: 'Disabled in production' })
  }
  const platform: any = req.scope.resolve(PLATFORM_MODULE)
  const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || "20", 10)))
  const offset = Math.max(0, parseInt((req.query.offset as string) || "0", 10))
  const [shops, count] = await platform.listAndCountShops({}, { take: limit, skip: offset })
  res.json({ shops, count, limit, offset })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  if (process.env.DISABLE_ADMIN_AUTH !== 'true') {
    return res.status(403).json({ message: 'Disabled in production' })
  }
  const platform: any = req.scope.resolve(PLATFORM_MODULE)
  const { name, handle, description, default_currency, country_code, is_active } = (req.body || {}) as any
  if (!name || !String(name).trim()) return res.status(400).json({ message: "'name' is required" })
  if (!handle || !String(handle).trim()) return res.status(400).json({ message: "'handle' is required" })
  const shop = await platform.createShops({ name, handle, description, default_currency, country_code, is_active })
  res.status(201).json({ shop: shop[0] })
}


