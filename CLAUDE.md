# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

An ElysiaJS + Prisma implementation of the [RealWorld](https://realworld-docs.netlify.app/) (Conduit) API spec, running on **Bun**. Part of the **Bedstack** project.

## Commands

```bash
bun dev              # Start dev server (watch mode)
bun run build        # Compile to binary
bun run preview      # Run compiled binary
bun test             # Run unit tests (Bun test framework)
bun run test:api     # Run API tests via Newman
bun run check        # Lint + format check (Biome)
bun run fix          # Auto-fix lint + format
bun run typecheck    # TypeScript type checking
bun run db:push      # Push Prisma schema to DB
bun run db:migrate   # Run Prisma migrations
bun run db:reset     # Reset database
bun run db:dev       # Start dev PostgreSQL container (Docker)
bun run db:test      # Start test PostgreSQL container (Docker)
```

## Architecture

**Domain-based modular structure** — each feature is a folder under `src/`:

- `articles/`, `comments/`, `users/`, `profiles/`, `tags/` — domain modules
- `core/` — app initialization, Prisma client (`db.ts`), env validation, core plugins (errors, health, OpenAPI)
- `shared/` — reusable auth plugins, error classes, types, utilities
- `tests/` — test setup (DB reset via preload)

Each domain module contains:
- `*.plugin.ts` — single file combining routes, business logic, and data access (no separate service/repo layers)
- `dto/` — request/response schemas using **ArkType** for runtime validation
- `mappers/` — transform Prisma models to API response shapes
- `interfaces/` — domain TypeScript types

**Key patterns:**
- ElysiaJS plugin composition — feature plugins mount into the main app (`core/app.ts`)
- `@auth` macro for protected routes (JWT + Argon2id in prod, Bcrypt in dev)
- ArkType schemas for request validation with automatic type inference
- Prisma ORM with generated client at `./generated/prisma`
- Path alias: `@/*` maps to `src/*`

## Database

PostgreSQL via Prisma. Models: `User`, `Article`, `Comment`, `Tag` with self-referential followers relation and many-to-many favorites/tags. Docker Compose provides dev (port 5432) and test (port 5433) containers.

## Formatting & Linting

Biome with tab indentation, double quotes. Import organization enabled.
