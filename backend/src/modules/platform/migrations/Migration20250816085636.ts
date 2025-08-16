import { Migration } from '@mikro-orm/migrations';

export class Migration20250816085636 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "shop_product" ("id" text not null, "shop_id" text not null, "product_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "shop_product_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_shop_product_deleted_at" ON "shop_product" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "shop_product" cascade;`);
  }

}
