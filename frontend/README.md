# [thedevbox] Frontend

The frontend setup for [thedevbox]

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS v4
- TypeScript (strict)
- Biome
- Vitest

## Setup

```sh
pnpm install
pnpm hook:install
pnpm dev
```

## Scripts

```sh
pnpm dev          # local development
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # biome check
pnpm lint:unsafe  # apply safe + unsafe autofixes
pnpm format       # biome format
pnpm typecheck    # TypeScript type check
pnpm hook:install # install Lefthook git hooks
pnpm hook:pre-commit # run the pre-commit hook manually
pnpm test         # vitest
pnpm test:watch   # vitest watch mode
```

## Git Hooks

The repo uses Lefthook with a root-level `lefthook.yml`. Install hooks after
installing dependencies:

```sh
pnpm hook:install
```

The pre-commit hook runs:

- `pnpm format`
- `pnpm lint`
- `pnpm typecheck`

## Tool Architecture

Each tool lives in its own folder under `src/tools/<tool-id>/`:

- `meta.ts`        tool metadata, server-safe (uses `defineTool`).
- `ui.tsx`         the tool UI, default-exported client component.
- `logic.ts`       pure logic for the tool.
- `logic.test.ts`  unit tests for the pure logic.

Shared tool UI lives in:

- `src/components/tool-kit/text-tool-layout.tsx`
- `src/components/tool-kit/tool-controls.tsx`

Aggregation lives in:

- `src/tools/index.ts`        imports each `meta.ts`, exports `TOOLS`,
                              `AVAILABLE_TOOLS`, `getToolById`, types.
- `src/tools/components.tsx`  lazy-loads each `ui.tsx` via `next/dynamic`,
                              exports `TOOL_COMPONENTS`.
- `src/tools/_define.ts`      `defineTool()` helper and shared types.

## Create a Tool

```sh
pnpm create:tool <tool-id>
```

Example:

```sh
pnpm create:tool base64 --category convert --name "Base64 Encode / Decode" --description "Encode and decode Base64 locally."
```

Categories:

- `format`
- `convert`
- `generate`
- `inspect`

The scaffold creates the four files under `src/tools/<tool-id>/` and
registers the tool in `src/tools/index.ts` and `src/tools/components.tsx`.
Run `pnpm lint:fix` afterwards to apply Biome's import-sort and formatting.

## Tool Guidelines

- Keep `src/components/tools` for actual tool pages only.
- Put reusable tool UI in `src/components/tool-kit`.
- Put testable behavior in `src/lib/tools`.
- Prefer local browser APIs and avoid new dependencies unless a tool truly needs
  one.
- Avoid arbitrary Tailwind values in components. Add clear tokens in
  `src/app/globals.css` when a repeated design value is needed.

Run:

```sh
pnpm test
```
