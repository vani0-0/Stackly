FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Stage: build
FROM base AS builder 
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /usr/src/app
RUN pnpm --global add turbo
COPY . .
RUN turbo prune api --docker

# Stage: install
FROM base AS installer
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk update && apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/out/json/ .
COPY --from=builder /usr/src/app/apps/api/.env.production.* .
RUN pnpm install
COPY --from=builder /usr/src/app/out/full .
RUN pnpm build --filter=api...

# Stage: start
FROM base AS runner 
WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=installer --chown=expressjs:expressjs /usr/src/app .

EXPOSE 3001

CMD ["node", "apps/api/dist/index.js"]