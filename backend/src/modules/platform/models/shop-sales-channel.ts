import { model } from "@medusajs/framework/utils"

const ShopSalesChannel = model.define("shop_sales_channel", {
  id: model.id().primaryKey(),
  shop_id: model.text(),
  sales_channel_id: model.text(),
})

export default ShopSalesChannel


