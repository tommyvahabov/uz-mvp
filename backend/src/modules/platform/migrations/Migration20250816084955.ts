import { Migration } from '@mikro-orm/migrations';

export class Migration20250816084955 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "shop" drop constraint if exists "shop_handle_unique";`);
    this.addSql(`create table if not exists "shop" ("id" text not null, "name" text not null, "handle" text not null, "description" text null, "default_currency" text not null default 'uzs', "country_code" text not null default 'uz', "is_active" boolean not null default true, "owner_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "shop_pkey" primary key ("id"));`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_shop_handle_unique" ON "shop" (handle) WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_shop_deleted_at" ON "shop" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "shop" cascade;`);
  }

}
