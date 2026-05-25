# Contributing

Thanks for taking the time to improve thedevbox. This project is meant to stay fast, private, and useful for everyday developer work.

## Project Setup

The active app lives in `frontend`.

```bash
cd frontend
pnpm install
pnpm hook:install
pnpm dev
```

Use pnpm for JavaScript dependencies and scripts.

## Development Workflow

- Keep tools browser-first unless server-side execution is truly required.
- Prefer small, focused changes that are easy to review.
- Follow existing TypeScript, React, Tailwind, and shared UI patterns.
- Keep user data local to the browser by default.
- Avoid adding tracking, accounts, ads, or unnecessary network calls.

## Adding A Tool

From `frontend`, use the scaffold command:

```bash
pnpm create:tool base64 --category convert --name "Base64 Encode / Decode" --description "Encode and decode Base64 locally."
```

The scaffold creates the tool component, shared logic file, unit test, registry entry, and component mapping. After scaffolding, update the generated files to match the tool behavior and UI.

Good tools for thedevbox are:

- useful in real developer workflows
- fast enough to feel instant
- private by default
- small, focused, and easy to understand
- consistent with the rest of the app

## Checks

Run the smallest useful check for your change before opening a pull request.

```bash
cd frontend
pnpm lint
pnpm typecheck
pnpm test
```

For formatting fixes:

```bash
pnpm format
```

Lefthook runs formatting, linting, and TypeScript checks before commits once hooks are installed.

## Pull Requests

Please include:

- a short summary of what changed
- screenshots or screen recordings for UI changes
- notes about tests or checks you ran
- any privacy, browser compatibility, or accessibility considerations

Keep PRs focused. If a change mixes a new tool, a refactor, and visual polish, consider splitting it into smaller PRs.

The pull request template mirrors this checklist.

## Issues And Ideas

Bug reports are most useful when they include:

- what happened
- what you expected
- steps to reproduce
- browser and OS, when relevant

Feature ideas are welcome, especially when they describe the developer workflow the tool would support.
