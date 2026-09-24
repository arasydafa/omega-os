# Changelog

All notable changes to `@omega-os/ui` are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Animated chart domains: Line/Scatter/Bar rescale with a tween toward visible data; `useTweenedNumber` hook (reduced-motion aware).
- Draggable `WordCloud` words with persistent offsets.
- Axis labels show final values while dots glide; `formatTick` helper.
- Proximity repulsion between dragged words; snap-back guard stays.
- `Bar` hidden columns collapse fully (flex, margin, opacity) so survivors fill the void.
- Collision guard on word drop: overlapping words snap back.
- `formatTick` keeps axis labels clean during tweens.

### Added

- Charts round 2: `Treemap` (squarified layout), `WordCloud` (deterministic scale), `Heatmap` (intensity grid).
- Interactive legends: `Pie` segment toggle with recompute, multi-series `Line`/`Scatter` with toggles, `GraphViewer` node-group legend.
- Rich hover tooltips on `Line`/`Scatter`; legacy single-series props keep working.
- Dedicated chart motion (`ot-duration-chart` 700ms + gentle `ot-ease-smooth`): grow, draw, pop, fade, sweep, and resize utilities shared by every chart.
- Animated hide everywhere: Pie segments sweep away, Bar collapses, Line/Scatter series and graph groups fade out before unmounting.
- `Bar` legend with per-bar toggle.
- Chart exit motion matches enter motion (`ot-chart-fade-out`, 700ms): Line/Scatter series and graph groups fade out before unmounting.

### Fixed

- Locked chart/graph scale across legend toggles so survivors never jump; rapid re-show cancels pending hides.
- Line dots slide in along the line direction instead of popping.
- Interactive navigation demo (stateful Code/Issues/Pulls).

## [0.12.0] — charts + graph

### Added

- Charts batch: `Pie` (donut/pie + legend), `Bar`, `Line` (area + dots), `Scatter` — custom SVG, no extra dependency.
- `GraphViewer`: layered auto-layout, pan/zoom controls, node selection.

### Fixed

- `GraphViewer` traps wheel scroll (non-passive listener) so zooming never scrolls the page.

## [0.11.0] — viewers batch

### Added

- Viewers batch: `FileViewer` (numbered code + copy), `Image` (aspect, skeleton, error placeholder), photo `Avatar` with initials fallback.

## [0.10.0] — canonical theme reveal

### Added

- Canonical `toggleThemeReveal` theme utility (Circular Reveal from the click point, token-driven, apply-once guarantee) with tests; demo and static preview share the same implementation.

## [0.9.1] — smooth theme reveal

### Fixed

- Theme reveal reads duration and easing from tokens (`ot-duration-reveal`, `ot-ease-smooth`) with a gentle-start curve, identical in demo and static preview.

## [0.9.0] — navigation depth + foundations

### Added

- `SearchBar` (clear button, shortcut hint, Escape to clear) and `SubmenuBar` (secondary strip with count badges).
- Foundations showcase in the demo app (typography scale, brand/status/surface swatches).
- Slow motion token (`ot-duration-slow`, `ot-transition-slow`) used by sidebar collapse.
- Navigation nesting: `NavbarLink.children` dropdown menus, 3-level `Sidebar` submenus.
- `OMEGA_ICONS` canonical icon list + `iconComponentName` helper with resolving test.
- Sliding active indicators on `Tabs` and `SubmenuBar`.
- `Table` per-column `skeleton` override with alignment-aware default.
- Foundations parity with preview (hover/tint swatches, radius card, usage notes, example sentences, rich-text sample, icon gallery).

### Fixed

- Dark-mode toggle hardened against icon-CDN and View Transition failures (class toggles exactly once).
- Modal backdrop now blurs the page behind it.
- Demo header transparency via color-mix (invalid opacity modifier removed).
- Demo dev server serves workspace fonts (fs.allow) instead of falling back to system fonts.
- Demo subtitle reads the package version dynamically; static preview copy is version-free.

## [0.8.0] — complements + hardening

### Added

- Complements batch: `Card`, `Avatar`, `Spinner`, `Radio`, `Checkbox`, `Switch`.
- Tokens: z-index scale (`ot-z-*`), motion (`ot-duration-*`, `ot-ease-*`, `ot-transition`), focus ring (`ot-ring`).
- Self-hosted fonts via Fontsource (no more Google Fonts network import).
- ESLint with local `no-emoji` rule + `lint` script.
- CI workflow: typecheck, lint, tests, and demo build on `main` and `dev`.

## [0.7.0] — navigation batch

### Added

- Navigation batch: `Breadcrumbs` (aria-current page), `Tabs` (arrow-key navigation), `Navbar` (brand + active links + actions), `Sidebar` (inline submenu + collapse rail).

### Fixed

- Sidebar collapse animation: animated width/label/submenu height, no icon jump, collapsed icon perfectly centered.

## [0.6.0] — data batch

### Added

- Data batch: `Table` (typed columns, selection, skeleton loading, empty fallback), `Pagination` (ellipsis window), `EmptyState`, `Skeleton`.

## [0.5.0] — overlay batch

### Added

- Overlay batch: `Toast` (`ToasterProvider` + `useToast`), `Modal` (portal + focus trap), `Dropdown` (flyout submenu), `Tooltip`.
- Overlay motion tokens: `ot-anim-*` enter/exit keyframes (fade, pop, slide-right) with `prefers-reduced-motion` guard; Toast/Modal/Dropdown/Tooltip play exit animation via delayed unmount.

## [0.4.0] — test + demo infra

### Added

- Vitest + Testing Library + jsdom suite: 24 tests across `Button`, `Badge`, `Alert`, `Input`/`Textarea`/`Select` (`npm test`).
- `apps/demo` Vite mini-app rendering all components with the Omega preset, including circular-reveal theme toggle.
- Labels associated to controls via `useId` (`Input`, `Textarea`, `Select`).

### Fixed

- Error border now swaps (`border-danger` + `focus:border-danger`) instead of stacking with `border-ot-border`, so the maroon border actually shows.
- Documented: consumers must include UI package source in Tailwind `content` or library classes are not generated.

## [0.3.0] — core components

### Added

- React components: `Button`, `Badge`, `Alert`, `Input`, `Textarea`, `Select` with full prop types.
- Spacing (`ot-1..ot-8`) and shadow (`ot-sm/md/lg`) tokens + preset keys.
- Preset `navy-bg` / `navy-text` / `maroon-bg` keys for theme-aware tints.

## [0.2.0] — tokens stable

### Added

- Functional status colors for alerts + toasts: info blue (`#1D4ED8`), warning yellow (`#B45309`), success green (`#15803D`), danger maroon (`#7B1E26`), with dark-mode variants.
- Theme-aware `--ot-navy-text` token (`#1E3A5F` light / `#C9DAEF` dark) for text on navy tints.
- Surface swatches section in `preview.html` (bg, surface, surface-2, border, text, muted).
- Interactive `preview.html`: clickable table + pagination, sidebar collapse + submenu, navbar dropdown + flyout, live toasts, working modal, circular-reveal dark toggle, icon gallery (90 icons).
- `docs/ICONS.md`: security/infra and people/content icon groups with one-icon-one-meaning rules.

### Fixed

- Dark-mode readability: navy text/icons on navy tints (navbar + sidebar active states, badges, alerts) now use `navy-text`.
- Dark muted brightened `#9AA3AF` → `#A6AEB9` for non-highlighted nav items.

## [0.1.0] — initial tokens

### Added

- Brand tokens: navy primary, maroon danger-only, dark-grey/white/black surfaces (light default + `.dark`).
- Typography: `Plus Jakarta Sans` + `JetBrains Mono` with type scale.
- Shape: rounded `8 / 12 / 16 / 20px`, no sharp corners.
- `tailwind.preset.js` (Tailwind v3, `darkMode: class`) and base `tokens.css`.
- Static `preview.html` and `docs/ICONS.md` (initial set).
