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
@import '@omega-os/ui/src/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Register the preset in `tailwind.config.js`:

```js
export default {
  presets: [require('@omega-os/ui/tailwind.preset.js')],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
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

## Status

v0.2.0 — tokens stable. No React components yet (planned for v0.3). See `CHANGELOG.md`.
