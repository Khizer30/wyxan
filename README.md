# Wyxan

A full-stack monorepo built with [Turborepo](https://turbo.build/repo), featuring a NestJS API and a Next.js web app with shared DTOs.

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
| DevOps   | Docker, Docker Compose, GitHub Actions CI     |

---

## Repository Structure

```
wyxan/
├── apps/
│   ├── api/                # NestJS backend (DDD)
│   │   └── src/
│   │       ├── modules/
│   │       │   └── user/
│   │       │       ├── domain/
│   │       │       ├── infrastructure/
│   │       │       ├── presentation/
│   │       │       └── services/
│   │       ├── common/
│   │       ├── database/
│   │       ├── middleware/
│   │       └── types/
│   └── web/                # Next.js frontend (FDA)
│       ├── app/            # Next.js App Router
│       ├── features/       # Feature modules
│       │   └── auth/
│       │       ├── api/
│       │       ├── components/
│       │       └── types/
│       └── shared/         # Cross-feature shared code
│           ├── components/
│           ├── hooks/
│           ├── lib/
│           ├── providers/
│           ├── stores/
│           └── types/
├── packages/
│   ├── dtos/               # Shared Zod DTOs
│   ├── eslint-config/      # Shared ESLint config
│   └── typescript-config/  # Shared TypeScript config
├── Dockerfile              # Multi-stage Docker build for the API
├── compose.yaml            # Docker Compose for production API & MongoDB
└── turbo.json
```

---

## Shared DTOs (`packages/dtos`)

Zod schemas live in `packages/dtos/src` and are consumed by both the NestJS backend (via `nestjs-zod`) and the Next.js frontend. Any change to a DTO is immediately reflected in both apps at build time.

---

## Prerequisites

- **Node.js** >= 24
- **pnpm** >= 11.10.0
- **Docker** & **Docker Compose** (for containerised services)

---

## Environment Variables

See the example files for all required variables:

- [`apps/api/.env.example`](apps/api/.env.example)
- [`apps/web/.env.example`](apps/web/.env.example)

---

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start all apps in watch mode
pnpm dev
```

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

## Docker & Compose

Run the containerised API along with MongoDB and persistent volume storage:

```bash
# Start all containers in detached mode
docker compose up -d

# View service logs
docker compose logs -f

# Stop containers
docker compose down
```

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
