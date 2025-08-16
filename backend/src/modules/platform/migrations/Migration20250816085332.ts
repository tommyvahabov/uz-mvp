import { Migration } from '@mikro-orm/migrations';

export class Migration20250816085332 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "shop_sales_channel" ("id" text not null, "shop_id" text not null, "sales_channel_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "shop_sales_channel_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_shop_sales_channel_deleted_at" ON "shop_sales_channel" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "shop_sales_channel" cascade;`);
  }

}
