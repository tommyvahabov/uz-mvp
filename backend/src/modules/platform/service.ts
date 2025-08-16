import { MedusaService } from "@medusajs/framework/utils"
import Shop from "./models/shop"
import ShopSalesChannel from "./models/shop-sales-channel"

class PlatformModuleService extends MedusaService({
  Shop,
  ShopSalesChannel,
}) {
  async attachSalesChannel(shopId: string, salesChannelId: string) {
    const existing = await this.retrieveShopSalesChannel(
      { shop_id: shopId, sales_channel_id: salesChannelId },
      {
        relations: [],
      }
    ).catch(() => null)
    if (existing) return existing
    const [created] = await this.createShopSalesChannels({
      shop_id: shopId,
      sales_channel_id: salesChannelId,
    })
    return created
  }

  async detachSalesChannel(shopId: string, salesChannelId: string) {
    const rel = await this.retrieveShopSalesChannel(
      { shop_id: shopId, sales_channel_id: salesChannelId }
    ).catch(() => null)
    if (!rel) return
    await this.deleteShopSalesChannels(rel.id)
  }
}

export default PlatformModuleService


