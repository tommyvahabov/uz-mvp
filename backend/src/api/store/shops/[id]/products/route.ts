import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const PLATFORM_MODULE = "platform"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const platform: any = req.scope.resolve(PLATFORM_MODULE)
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const limit = Math.min(
    100,
    Math.max(1, parseInt((req.query.limit as string) || "20", 10))
  )
  const offset = Math.max(0, parseInt((req.query.offset as string) || "0", 10))

  const [links, count] = await platform.listAndCountShopProducts(
    { shop_id: req.params.id },
    { take: limit, skip: offset }
  )

  const productIds = links.map((l: any) => l.product_id)

  let products: any[] = []
  if (productIds.length) {
    const result = await query.graph({
      entity: "product",
      fields: [
        "id",
        "title",
        "handle",
        "status",
        "thumbnail",
      ],
      filters: { id: productIds },
    })
    products = result.data
  }

  res.json({ products, count, limit, offset })
}


