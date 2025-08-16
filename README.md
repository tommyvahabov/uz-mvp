# Uzbekistan Commerce MVP

Monorepo with Medusa backend and Next.js storefront.

## Structure
- backend: Medusa (API, modules)
- storefront: Next.js Storefront
- docker-compose.yml: optional Postgres/Redis (if you use Docker)

## Local setup (without Docker)
1) Requirements: Node 18+, Yarn/NPM, Homebrew services for Postgres and Redis.
2) Start DBs (already installed):
   brew services start postgresql@14 && brew services start redis
3) Backend:
   cd backend && cp .env.example .env || true
   # set DATABASE_URL=postgres://medusa:medusa@localhost:5432/medusa and REDIS_URL=redis://localhost:6379
   yarn install && yarn dev
4) Storefront:
   cd ../storefront && yarn install && yarn dev

Backend: http://localhost:9000
Storefront: http://localhost:8000

## Admin access
- Create admin user:
  - `cd backend && npx --yes medusa user -e admin@example.com -p admin123`
- Admin UI (after build): open `/platform/shops` inside the Admin app.
- Admin APIs require auth; Store APIs are public under `/store/*`.

## Dev tips
- If Next.js fails downloading SWC: we run dev with `NEXT_DISABLE_SWC_NATIVE_BINDINGS=1` and `NEXT_SKIP_SWCDOWNLOAD=1` to avoid Corepack/Yarn issues.
- To generate a publishable key for storefront: `cd backend && npm run seed` or run `src/scripts/create_publishable_key.ts`.

## Notes
- Currency: UZS (no decimals).
- Next steps: add Payme/CLICK payment providers and UzPost fulfillment provider.

## Production (Docker)
1) Build images and start:
   - `docker compose -f docker-compose.prod.yml up -d --build`
2) Backend: http://localhost:9000, Storefront: http://localhost:8000
3) Set `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` in your environment for storefront.
