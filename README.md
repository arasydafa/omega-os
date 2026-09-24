# OmegaOS UI (`@omega-os/ui`)

[![CI](https://github.com/arasydafa/omega-os/actions/workflows/ci.yml/badge.svg)](https://github.com/arasydafa/omega-os/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/arasydafa/omega-os?sort=semver)](https://github.com/arasydafa/omega-os/releases)
[![License: MIT](https://img.shields.io/github/license/arasydafa/omega-os)](LICENSE)
[![Demo](https://img.shields.io/website?url=https%3A%2F%2Farasydafa.github.io%2Fomega-os%2F&label=demo)](https://arasydafa.github.io/omega-os/)

Modern minimalist React design system. Navy/maroon/dark-grey, light mode by
default with dark via `class="dark"`, rounded everything, lucide icons only.

**Live demo:** https://arasydafa.github.io/omega-os/

## Features

- 40+ components, 141 tests: layout (Navbar, Sidebar), overlays (Modal,
  Drawer, Toast), data display (Table, Pagination, custom SVG Charts,
  GraphViewer), forms, navigation, and viewers (FileViewer, CodeBlock).
- Theme tokens as CSS variables (`--ot-*`) + Tailwind preset with semantic
  classes (`bg-ot-surface`, `text-navy-text`, `bg-success-bg`, ...).
- Self-hosted fonts (Plus Jakarta Sans + JetBrains Mono), offline-friendly.
- View-Transitions theme reveal, exit animations, reduced-motion support.

## Install

Not on the npm registry yet — install from a local checkout (same layout the
pilot app uses):

```bash
npm install file:../omega-os
```

npm publish is planned; the package name `@omega-os/ui` is still free.

## Usage

1. Import tokens in `src/main.tsx` (JS import, so the bundler resolves the
   package `exports` map in both dev and build):

```tsx
import '@omega-os/ui/tokens.css';
import './index.css';
```

2. Register the preset in `tailwind.config.js` (include the UI dist so
   library classes are generated):

```js
export default {
  presets: [require('@omega-os/ui/tailwind.preset.js')],
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@omega-os/ui/dist/**/*.js'],
};
```

3. Use semantic classes:

```
bg-ot-bg text-ot-text
bg-ot-surface border-ot-border rounded-ot-md
bg-navy text-white
bg-info-bg text-info / bg-warning-bg text-warning / bg-success-bg text-success / bg-danger-bg text-danger
```

4. Dark mode: toggle `class="dark"` on `<html>`. The `toggleThemeReveal(x, y, apply)`
   helper does it with a circular wipe from the click point.

## Principles

- Modern minimalist. Brand: navy `#1E3A5F` (primary), maroon `#7B1E26`
  (danger only), dark-grey `#2B2F36`, white, black.
- Status (alerts + toasts): info blue `#1D4ED8`, warning yellow `#B45309`,
  success green `#15803D`, danger maroon `#7B1E26` (light mode).
- Typography: `Plus Jakarta Sans` (UI) + `JetBrains Mono` (code).
- Rounded everything: `8 / 12 / 16 / 20px` + `full` for pills. No `rounded-none`.
- Icons via `lucide-react` only, no emoji. Full list in `docs/ICONS.md`.

## Rules

- Never place `navy` text on `navy-bg` tint — always use `navy-text` on
  `navy-bg` (theme-aware: dark `#1E3A5F` on light tint, light `#C9DAEF` on
  dark tint).
- `trash-2` + maroon are destructive-only. `triangle-alert` is warning-only
  (yellow), `octagon-x` is error-only (maroon).

## Demo

Interactive React showcase of every component:

```
cd apps/demo && npm.cmd install && npm.cmd run dev   # http://localhost:5173
```

The static `preview.html` in the repo root shows tokens and core patterns
without React.

## Development

Two installs are required (root holds the shared toolchain, the demo has its own):

```
# from the repo root
npm.cmd install
npm.cmd run check   # typecheck
npm.cmd run lint    # eslint, incl. no-emoji rule
npm.cmd test        # vitest
npm.cmd run build   # dist build (types + JS + tokens)

cd apps/demo
npm.cmd install
npm.cmd run build   # typecheck + production build
```

Work happens on `dev` (or `feat/*`), releases merge to `main` with a version
bump + changelog + tag. See `docs/VERSIONING.md`.

## Status

v1.0.0 — first stable (pilot vstack migrated). 141 tests green. See `CHANGELOG.md`.

## License

MIT © 2026 Arasy Dafa Sulistya Kurniawan. See [LICENSE](LICENSE).
