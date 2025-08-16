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

## Notes
- Currency: UZS (no decimals).
- Next steps: add Payme/CLICK payment providers and UzPost fulfillment provider.
