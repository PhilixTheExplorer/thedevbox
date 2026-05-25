# [thedevbox]

[![Website](https://img.shields.io/badge/site-thedevbox.org-52a878?style=flat-square)](https://thedevbox.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=111111)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Biome](https://img.shields.io/badge/Biome-2.2-60a5fa?style=flat-square&logo=biome&logoColor=white)](https://biomejs.dev)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-6e9f18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-f69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io)

Tools that do not suck. No ads. No accounts. No tracking.

[thedevbox] is a collection of developer tools built by and for developers who got tired of sites that require a login to format JSON, sketchy online converters that probably log your data, and heavy desktop apps just to decode a token.

Every tool runs **entirely in your browser** unless a tool clearly says otherwise. Your data stays on your machine, and we do not track what you paste.

## Philosophy

Developer tools should be fast, honest, and free. Not free as in "we monetized your clipboard", but actually free.

The goal is simple: open the page, use the tool, close the tab. No drama.

## What's Inside

The frontend currently includes browser-first tools across a few growing categories:

- Format: JSON, URL, and similar text cleanup tools.
- Convert: timestamps, encoders/ decoders, and file/data conversions.
- Generate: UUIDs and other small developer-safe generators.
- Inspect: user agents, headers, tokens, and debugging helpers.

More tools are intentionally easy to add. The project includes a scaffold command so contributors do not have to memorize the registry shape.

## Stack

- **Frontend:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS, Biome, Vitest
- **Backend:** planned for tools that genuinely need server-side runtime support

## Quick Start

The active app lives in `frontend`.

```bash
cd frontend
pnpm install
pnpm hook:install
pnpm dev
```

For detailed frontend setup, architecture, and tool conventions, read [frontend/README.md](./frontend/README.md). For contribution workflow, read [CONTRIBUTING.md](./CONTRIBUTING.md).

## Git Hooks

This repo uses Lefthook for pre-commit checks. After installing frontend
dependencies, install the hooks from `frontend`:

```bash
pnpm hook:install
```

Before each commit, Lefthook runs formatting, linting, and TypeScript checks for
the frontend.

## Creating A Tool

From the frontend directory:

```bash
pnpm create:tool base64 --category convert --name "Base64 Encode / Decode" --description "Encode and decode Base64 locally."
```

The scaffold command creates the tool component, shared logic file, unit test, registry entry, and component mapping.

## Contributing

Contributions are welcome. The best tools for this project are:

- useful in real developer workflows
- fast enough to feel instant
- private by default
- small, focused, and easy to understand
- built with shared UI patterns so the app feels coherent

If you find a bug, have an idea, or want to add a tool, open an issue or pull request. See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, checks, and PR expectations.

## License

This project is open source and licensed under the MIT License. See [LICENSE](./LICENSE).
