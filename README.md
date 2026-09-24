# OmegaOS UI (`@omega-os/ui`)

Design system foundation for all Omega Throne webs: tools, opensource, portfolio, profile.

## Principles

- Modern minimalist. Brand: navy `#1E3A5F` (primary), maroon `#7B1E26` (danger only), dark-grey `#2B2F36`, white, black.
- Status (alerts + toasts): info blue `#1D4ED8`, warning yellow `#B45309`, success green `#15803D`, danger maroon `#7B1E26` (light mode).
- Light mode default, dark via `class="dark"`.
- Typography: `Plus Jakarta Sans` (UI) + `JetBrains Mono` (code).
- Rounded everything: `8 / 12 / 16 / 20px` + `full` for pills. No `rounded-none`.
- Icons via `lucide-react` only, no emoji. Full list in `docs/ICONS.md`.

## Rules

- Never place `navy` text on `navy-bg` tint — always use `navy-text` on `navy-bg` (theme-aware: dark `#1E3A5F` on light tint, light `#C9DAEF` on dark tint).
- `trash-2` + maroon are destructive-only. `triangle-alert` is warning-only (yellow), `octagon-x` is error-only (maroon).

## Usage

1. Import tokens in `src/index.css`:

```css
@import '@omega-os/ui/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Register the preset in `tailwind.config.js` (include the UI source so library classes are generated):

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

4. Dark mode: toggle `class="dark"` on `<html>` (see `preview.html` for a circular-reveal example using the View Transitions API).

## Preview

Open `preview.html` in a browser: typography, brand + status + surface colors, buttons, forms, navbar, sidebar (collapse + submenu), table + pagination, alerts, toasts, modal, popup, icon gallery.

For the interactive React demo: `cd apps/demo && npm.cmd install && npm.cmd run dev` → http://localhost:5173.

## Development

Two installs are required (root holds the shared toolchain, the demo has its own):

```
# from the repo root
npm.cmd install
npm.cmd run check   # typecheck
npm.cmd run lint    # eslint, incl. no-emoji rule
npm.cmd test        # vitest

cd apps/demo
npm.cmd install
npm.cmd run build   # typecheck + production build
```

Work happens on `dev` (or `feat/*`), releases merge to `main` with a version bump + changelog + tag. See `docs/VERSIONING.md`.

## Status

v1.0.0 — first stable (pilot vstack migrated). 141 tests green. See `CHANGELOG.md`.
