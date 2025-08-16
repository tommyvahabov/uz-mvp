import { model } from "@medusajs/framework/utils"

const ShopPublishableKey = model.define("shop_publishable_key", {
  id: model.id().primaryKey(),
  shop_id: model.text(),
  token: model.text(),
})

export default ShopPublishableKey


