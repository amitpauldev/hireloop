<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# HireLoop Client

Next.js 16 App Router + React 19 + Tailwind CSS v4 + shadcn/ui built on **Base UI** (`@base-ui/react`), not Radix.

## Commands

- `npm run dev` / `npm run build` / `npm start`
- `npm run lint` — plain ESLint (not `next lint`), no args: lints the whole project
- `npm run typecheck` — `tsc --noEmit`
- `npm run format`
- No tests are configured. Verification = `typecheck` + `lint` (run `typecheck` first; report its output before lint).

## Conventions

- Path alias `@/*` maps to the repo root (e.g. `@/components/ui/button`).
- `cn` comes from the `cn` npm package, re-exported via `lib/utils.ts` — import `{ cn } from "cn"` or `@/lib/utils`; there is no local clsx/tailwind-merge helper.
- Tailwind v4: **no `tailwind.config` file**. Theme colors, radii, and fonts are CSS variables + `@theme inline` in `app/globals.css`. Dark mode keyed off `.dark` class.
- shadcn components live in `components/ui`; add more with `npx shadcn@latest add <component>` (style `base-nova`, per `components.json`). App-level components go in `components/` (e.g. `components/shared/header/`, with a barrel `index.ts`).
- Base UI components support a `render` prop (like Radix `asChild`): `render={<Link href="..." />}` renders Button as a link. `buttonVariants` can also style plain `next/link` elements directly.
- Icons: `lucide-react`.

