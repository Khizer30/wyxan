# Wyxan

A full-stack monorepo built with [Turborepo](https://turbo.build/repo), featuring a NestJS API and a Next.js web app with shared DTOs.

---

## Getting Started

Needs Node >= 24, pnpm, and a running MongoDB.

```bash
# 1. Install dependencies
pnpm install

# 2. Create .env from the example and fill in DATABASE_URL
cp .env.example .env

# 3. Seed the web
pnpm --filter api seed

# 4. Start the API (http://localhost:5000/api) and the web app (http://localhost:3000)
pnpm dev
```

---

## Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Monorepo | Turborepo, pnpm workspaces                    |
| Backend  | NestJS, DDD architecture                      |
| Frontend | Next.js 16, Feature-Driven Architecture (FDA) |
| Database | MongoDB                                       |
| Shared   | Zod DTOs (`packages/dtos`)                    |
| Styling  | Tailwind CSS v4, shadcn/ui                    |
| State    | TanStack Query, Zustand                       |
| i18n     | i18next, react-i18next                        |
| CI       | GitHub Actions                                |

---

## Repository Structure

```
wyxan/
├── apps/
│   ├── api/                # NestJS backend (DDD)
│   │   └── src/
│   │       ├── modules/    # person, site, visit, browse
│   │       │   └── <name>/ # domain, infrastructure, presentation, services
│   │       ├── common/
│   │       ├── middleware/
│   │       └── seed/       # deterministic seed data and history
│   └── web/                # Next.js frontend (feature-driven)
│       ├── app/            # Next.js App Router
│       ├── features/
│       │   └── browser/    # api, hooks, components
│       └── shared/         # Cross-feature shared code
├── packages/
│   ├── dtos/               # Shared Zod DTOs and address normaliser
│   ├── eslint-config/      # Shared ESLint config
│   └── typescript-config/  # Shared TypeScript config
└── turbo.json
```

---

## Shared DTOs (`packages/dtos`)

Zod schemas live in `packages/dtos/src` and are consumed by both the NestJS backend (via `nestjs-zod`) and the Next.js frontend. Any change to a DTO is immediately reflected in both apps at build time.

---

## Prerequisites

- **Node.js** >= 24
- **pnpm** >= 11.10.0
- **MongoDB** running locally or reachable by URL

---

## Available Scripts

The following scripts are defined in the root [`package.json`](package.json):

### Development & Build

| Script           | Command                   | Description                                  |
| ---------------- | ------------------------- | -------------------------------------------- |
| `pnpm dev`       | `turbo run dev`           | Start all applications in watch mode         |
| `pnpm dev:api`   | `pnpm --filter api dev`   | Start only the NestJS API in watch mode      |
| `pnpm dev:web`   | `pnpm --filter web dev`   | Start only the Next.js web app in watch mode |
| `pnpm build`     | `turbo run build`         | Build all packages and applications          |
| `pnpm build:api` | `pnpm --filter api build` | Build only the NestJS API                    |
| `pnpm build:web` | `pnpm --filter web build` | Build only the Next.js web app               |

### Code Quality & Formatting

| Script            | Command                                    | Description                                      |
| ----------------- | ------------------------------------------ | ------------------------------------------------ |
| `pnpm lint`       | `turbo run lint`                           | Run ESLint across all workspaces                 |
| `pnpm lint:fix`   | `turbo run lint:fix`                       | Automatically fix ESLint issues                  |
| `pnpm format`     | `prettier --check "**/*.{ts,tsx,json,md}"` | Check formatting with Prettier                   |
| `pnpm format:fix` | `prettier --write "**/*.{ts,tsx,json,md}"` | Fix formatting with Prettier                     |
| `pnpm typecheck`  | `turbo run typecheck`                      | Run TypeScript type checks across all workspaces |

---

## CI Pipeline

GitHub Actions runs on pull requests to `master` (`.github/workflows/ci.yml`).

**Workflow steps:**

1. Checkout repository (`actions/checkout@v5`)
2. Setup pnpm (`pnpm/action-setup@v6`, pnpm 11)
3. Setup Node.js (`actions/setup-node@v5`, Node 24)
4. Install dependencies (`pnpm install --frozen-lockfile`)
5. Lint check (`pnpm lint`)
6. Format check (`pnpm format`)
7. Build check (`pnpm build`)
8. TypeScript check (`pnpm typecheck`)

---

## Author

**Syed Muhammad Khizer** — [syed.khizer30@gmail.com](mailto:syed.khizer30@gmail.com)
