import Medusa from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL
}

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

export const fetchShopProducts = async (
  shopId: string,
  pagination: { limit?: number; offset?: number } = {}
) => {
  const params = new URLSearchParams()
  if (pagination.limit != null) params.set("limit", String(pagination.limit))
  if (pagination.offset != null) params.set("offset", String(pagination.offset))
  const url = `${MEDUSA_BACKEND_URL}/store/shops/${shopId}/products?${params.toString()}`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) throw new Error(`Failed to fetch shop products`)
  return res.json() as Promise<{ products: any[]; count: number; limit: number; offset: number }>
}
