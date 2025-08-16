import { MedusaService } from "@medusajs/framework/utils"
import Shop from "./models/shop"
import ShopSalesChannel from "./models/shop-sales-channel"
import ShopProduct from "./models/shop-product"

class PlatformModuleService extends MedusaService({
  Shop,
  ShopSalesChannel,
  ShopProduct,
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

  async attachProduct(shopId: string, productId: string) {
    const existing = await this.retrieveShopProduct(
      { shop_id: shopId, product_id: productId },
      { relations: [] }
    ).catch(() => null)
    if (existing) return existing
    const [created] = await this.createShopProducts({ shop_id: shopId, product_id: productId })
    return created
  }

  async detachProduct(shopId: string, productId: string) {
    const rel = await this.retrieveShopProduct({ shop_id: shopId, product_id: productId }).catch(() => null)
    if (!rel) return
    await this.deleteShopProducts(rel.id)
  }
}

export default PlatformModuleService


