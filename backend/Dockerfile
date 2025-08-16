# syntax=docker/dockerfile:1
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund

FROM deps AS build
WORKDIR /app
COPY . .
ENV STORE_CORS=http://localhost:8000 \
    ADMIN_CORS=http://localhost:7001,http://localhost:7000 \
    AUTH_CORS=http://localhost:8000 \
    NODE_ENV=production
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/.medusa ./.medusa
COPY --from=build /app/package*.json ./
EXPOSE 9000
CMD ["npx", "medusa", "start"]


