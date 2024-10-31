# Base image
FROM node:18-alpine as BASE 

# Builder stage
FROM base AS builder 
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install turbo globally
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g turbo 

# Copy the project files and prune for the `api` package
COPY . .
RUN turbo prune --scope=api --docker

# Installer stage
FROM base as installer 
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy pruned files and install dependencies with pnpm
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/package.json ./package.json
RUN pnpm install --frozen-lockfile --prod 

# Copy all necessay files after install
COPY --from=builder /app/out/full/ .

# Build turbo
RUN pnpm turbo run build --filter=api...

# Runner stage
FROM base as runner
WORKDIR /app

# Add a non-root user
RUN addgroup -S expressjs && adduser -S expressjs -G expressjs
USER expressjs

# Copy the built app from installer stage
COPY --from=installer /app .

# Start the application
CMD ["node", "apps/api/dist/index.js"]