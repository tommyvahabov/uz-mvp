import { model } from "@medusajs/framework/utils"

// Minimal shop/tenant model to start multi-tenant platform work
const Shop = model.define("shop", {
  id: model.id().primaryKey(),
  name: model.text().searchable(),
  handle: model.text().unique(),
  description: model.text().nullable(),
  default_currency: model.text().default("uzs"),
  country_code: model.text().default("uz"),
  is_active: model.boolean().default(true),
  owner_id: model.text().nullable(),
})

export default Shop


