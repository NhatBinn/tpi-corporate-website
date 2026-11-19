@AGENTS.md

# TPI App

Corporate website for TPI (a Vietnamese construction-chemicals / materials company), plus a small admin area. Deployed on Vercel at `https://tpi-corporate-website.vercel.app`. UI text, URL slugs, validation messages and many code comments are in **Vietnamese**; keep new user-facing copy in Vietnamese.

## Stack

- **Next.js 16** (App Router), **React 19**, TypeScript. Package manager and script runner is **Bun** (`bun.lock`).
- **Prisma 7** with the `prisma-client` generator + `@prisma/adapter-pg` (PostgreSQL). The generated client is checked in at `prisma/generated/prisma/` — import from `@/prisma/generated/prisma/client`, not `@prisma/client`.
- **Better Auth** (email + password) with the Prisma adapter.
- **Tailwind CSS v4** (config lives in `app/globals.css`, no `tailwind.config`), **shadcn** (`base-nova` style, built on `@base-ui/react`, not Radix), `lucide-react` + `react-icons`.
- Forms: `react-hook-form` + `zod` v4 (client-side) and Server Actions with `useActionState` (server-side).

## Commands

```bash
bun dev                          # dev server on :3000
bun run build                    # production build
bun run lint                     # eslint (flat config, eslint.config.mjs)
bun run db:seed                  # seed DB via prisma/seed.ts
bun --bun run prisma migrate dev # create/apply migrations
bun --bun run prisma generate    # regenerate client into prisma/generated/prisma
```

There is no test suite. Env vars (in `.env`, git-ignored): `DATABASE_URL`, `BETTER_AUTH_URL` (plus Better Auth's secret).

## Next.js 16 specifics used here

- **`proxy.ts`** at the root replaces `middleware.ts`. It guards `/admin/:path+` (i.e. everything under `/admin/` but not `/admin` itself, which is the login page) and redirects to `/` without a Better Auth session.
- `params` in pages/layouts is a `Promise` and must be awaited (see `app/(website)/du-an/[slug]/page.tsx`).
- `cacheComponents` is present but commented out in `next.config.ts`; no `"use cache"` is in use. Check `node_modules/next/dist/docs/` before introducing caching APIs.

## Architecture

Layered data flow — keep to it when adding features:

```
page / Server Component / Server Action
  → services/*.service.ts      try/catch, returns Result<T>
    → repositories/*.repository.ts   raw Prisma queries (explicit `select`)
      → lib/prisma.ts               singleton PrismaClient with PrismaPg adapter
```

- **Repositories** only talk to Prisma. Name functions `findX`. Always use `select` to shape the payload; matching TS types live in `types/common.ts` (often derived via `Prisma.XGetPayload<...>`).
- **Services** wrap repository calls, log with `console.log("~fnName~", error)`, and return `ok(data)` / `err(message)` from `types/result.ts`. Name functions `getX` / `submitX`. Callers branch on `res.success` (e.g. `notFound()` on failure in detail pages).
- **Server Actions** (`"use server"`) live next to the route that uses them (`app/(website)/lien-he/actions.ts`, `app/(admin)/admin/actions/auth.ts`). Pattern: `(prevState, formData) => ActionState`, validate with the zod schema from `schemas/`, return `{ success, message?, errors? }` using `error.flatten().fieldErrors`. Action state types are in `types/common.ts`.
- **Zod schemas** in `schemas/` are shared by the client form (`zodResolver`) and the server action.

### Routes (`app/`)

- `(website)/` — public site, wrapped by `Header` (async server component that fetches product categories for the mega menu) / `Main` / `Footer`.
  - `/` home, `/gioi-thieu` (about), `/san-pham` (products), `/du-an` + `/du-an/[slug]` (projects), `/lien-he` (contact form → `Feedback` table).
- `(admin)/admin/` — `/admin` is the login page (client component; contains dev helpers that sign up / copy a hard-coded demo admin account). `/admin/dashboard/*` (products, projects, tags) uses `components/admin/Sidebar`.
- `api/auth/[...all]` — Better Auth handler. `lib/auth.ts` = server instance (`auth.api.*`), `lib/auth-client.ts` = React client.
- Root `app/` has `layout.tsx` (fonts: Inter, Cardo, Geist; `lang="vi"`; site metadata), `error.tsx`, `loading.tsx`, `not-found.tsx`.

### Components (`components/`)

Organized by page/feature: `home/`, `introduction/`, `product/`, `project/`, `contact/`, `header/`, `layout/`, `admin/`, `common/` (shared across pages), `ui/` (shadcn-generated — add via the shadcn CLI rather than hand-writing). Data-fetching components are async Server Components calling services directly; mark interactive ones `"use client"`. `hooks/useInfiniteList.ts` powers the infinite carousels.

### Data model (`prisma/schema.prisma`)

- Auth models (`User`, `Session`, `Account`, `Verification`, enum `Role`) are owned by Better Auth — **do not add `@map` to their fields**; the library expects camelCase column names.
- Domain: `Product` / `ProductCategory` / `ProductImage` / `Tag`, `Solution` / `SolutionCategory`, `Project` / `ProjectCategory` / `ProjectImage`, `ProjectProduct` (explicit many-to-many join between projects and products), `Feedback` (contact submissions).
- Schema comments are in Vietnamese and fairly detailed — read them before changing models. Seed data uses readable string IDs (e.g. category id `cat-chat-thao-khuon`, referenced directly in `components/product/ProductCategorySection.tsx`).

## Conventions

- Path alias `@/*` → repo root. Use `cn()` from `lib/utils.ts` for class merging.
- Images live in `public/` and are referenced by path (often `.webp`).
- Commit messages are short and informal; no enforced format.

## Work in progress

The admin product CRUD (`app/(admin)/admin/dashboard/products/page.tsx`, `lib/utils.ts`) currently imports modules that do not exist yet (`@/actions/product`, `@/lib/product-utils`, `@/types/product`); the root `actions/` directory is empty. Expect type errors there until that feature is finished.
