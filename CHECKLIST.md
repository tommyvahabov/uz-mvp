# Project Checklist

- Core setup
  - [x] Docker Postgres/Redis
  - [x] Backend `.env` (DB/Redis/CORS/JWT/COOKIE)
  - [x] Seed helper to create publishable key (`create_publishable_key.ts`)
  - [x] Push to GitHub after changes

- Backend build/run
  - [x] Dev mode runs
  - [x] Prod build succeeds (admin bundling enabled)
  - [x] Clean admin widget zone warning (non-blocking)

- Platform module (multi-tenant)
  - [x] `shop` model/service/migrations
  - [x] Admin APIs
    - [x] Shops list/create (pagination + validation): `/admin/platform/shops`
    - [x] Shop retrieve/update/delete: `/admin/platform/shops/:id`
    - [x] Shop ↔ Sales Channel attach/list/detach: `/admin/platform/shops/:id/sales-channels`
    - [x] Shop ↔ Product attach/list/detach: `/admin/platform/shops/:id/products`
    - [x] Bootstrap shop + sales channel: `/admin/platform/shops/bootstrap`

- Storefront scope
  - [x] Store endpoint to list products by shop: `/store/shops/:id/products`
  - [x] Default region set to UZ
  - [x] Client util `fetchShopProducts(shopId, {limit, offset})`
  - [x] Stabilize Next.js dev (SWC/Corepack permissions on this machine)

- Admin UI
  - [x] Minimal widget included to verify bundling
  - [x] Real Shops management screen (list/create/attach products/channels)
  - [x] Decide: extend Medusa Admin vs separate `apps/admin`

- Catalog scoping
  - [ ] Enforce product queries by shop across admin/store APIs
  - [ ] Optional middleware/context to infer current shop

- Sales channel flows
  - [x] Helpers to create shop + channel + publishable key in one flow
  - [ ] Ensure storefront uses appropriate sales channel

- Payments (Uzbekistan-first)
  - [ ] `modules/payment-payme`
  - [ ] `modules/payment-click`

- Fulfillment/Logistics
  - [ ] `modules/fulfillment-uzpost` (rates, labels, tracking)

- Search/Discovery
  - [ ] Phase 1: DB-backed search endpoints
  - [ ] Phase 2: Meilisearch/Typesense module + sync

- Notifications
  - [ ] Email (SMTP/Resend), SMS (local aggregator) modules
  - [ ] Event-driven templates (locale-aware)

- Media/files
  - [ ] S3-compatible storage; signed URLs

- Identity & RBAC
  - [ ] Admin roles (owner, manager, support)
  - [ ] Optional SSO (OIDC) later

- Storefront multi-shop UX
  - [ ] Strategy: subpath or domain-based routing
  - [ ] Map handle/domain → `shopId` and scope data

- Observability
  - [ ] Structured logs, metrics (OTel), error tracking (Sentry)

- CI/CD
  - [x] GitHub Actions (build)
  - [x] Dockerfiles and production compose
  - [ ] Staging/prod envs

- Docs
  - [ ] README updates for local dev, APIs, and platform concepts
