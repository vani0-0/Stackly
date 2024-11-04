FROM node:22-alpine AS base

# base setup
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Stage: build
FROM base AS builder 
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /usr/src/app

RUN pnpm --global add turbo
COPY . .
RUN turbo prune web --docker

# Stage: install
FROM base AS installer
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/out/json/ .
RUN pnpm install

COPY --from=builder /usr/src/app/out/full/ .
RUN pnpm build --filter=web...

# Stage: start
FROM base AS runner 
WORKDIR /usr/src/app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 sveltejs
RUN adduser --system --uid 1001 sveltejs
USER sveltejs

COPY --from=installer /usr/src/app/apps/web/build build/
COPY --from=installer /usr/src/app/apps/web/node_modules node_modules/
COPY --from=installer /usr/src/app/apps/web/package.json .

EXPOSE 3000

CMD ["node", "build/index.js"]