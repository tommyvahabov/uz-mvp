import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { createSalesChannelsWorkflow } from "@medusajs/medusa/core-flows"

const PLATFORM_MODULE = "platform"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const platform: any = req.scope.resolve(PLATFORM_MODULE)
  const container = req.scope

  const { name, handle, description, sales_channel_name } = (req.body || {}) as {
    name?: string
    handle?: string
    description?: string
    sales_channel_name?: string
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "'name' is required" })
  }
  if (!handle || !handle.trim()) {
    return res.status(400).json({ message: "'handle' is required" })
  }

  const createdShopArr = await platform.createShops({ name, handle, description })
  const shop = createdShopArr[0]

  const { result } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        {
          name: sales_channel_name || `${name} Channel`,
        },
      ],
    },
  })
  const salesChannel = result[0]

  await platform.attachSalesChannel(shop.id, salesChannel.id)

  res.status(201).json({ shop, sales_channel: salesChannel })
}


