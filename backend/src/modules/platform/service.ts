import { MedusaService } from "@medusajs/framework/utils"
import Shop from "./models/shop"
import ShopSalesChannel from "./models/shop-sales-channel"
import ShopProduct from "./models/shop-product"
import ShopPublishableKey from "./models/shop-publishable-key"

class PlatformModuleService extends MedusaService({
  Shop,
  ShopSalesChannel,
  ShopProduct,
  ShopPublishableKey,
}) {
  async attachSalesChannel(shopId: string, salesChannelId: string) {
    const [existing] = await this.listShopSalesChannels({
      shop_id: shopId,
      sales_channel_id: salesChannelId,
    })
    if (existing) return existing
    const created = await this.createShopSalesChannels({
      shop_id: shopId,
      sales_channel_id: salesChannelId,
    })
    return created
  }

  async detachSalesChannel(shopId: string, salesChannelId: string) {
    const [rel] = await this.listShopSalesChannels({
      shop_id: shopId,
      sales_channel_id: salesChannelId,
    })
    if (!rel) return
    await this.deleteShopSalesChannels(rel.id)
  }

  async attachProduct(shopId: string, productId: string) {
    const [existing] = await this.listShopProducts({
      shop_id: shopId,
      product_id: productId,
    })
    if (existing) return existing
    const created = await this.createShopProducts({ shop_id: shopId, product_id: productId })
    return created
  }

  async detachProduct(shopId: string, productId: string) {
    const [rel] = await this.listShopProducts({ shop_id: shopId, product_id: productId })
    if (!rel) return
    await this.deleteShopProducts(rel.id)
  }

  async upsertPublishableKey(shopId: string, token: string) {
    const [existing] = await this.listShopPublishableKeys({ shop_id: shopId })
    if (existing) {
      const [updated] = await this.updateShopPublishableKeys(existing.id, { token })
      return updated
    }
    const created = await this.createShopPublishableKeys({ shop_id: shopId, token })
    return created
  }
}

export default PlatformModuleService


