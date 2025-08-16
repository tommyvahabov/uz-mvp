import { model } from "@medusajs/framework/utils"

const ShopProduct = model.define("shop_product", {
  id: model.id().primaryKey(),
  shop_id: model.text(),
  product_id: model.text(),
})

export default ShopProduct


