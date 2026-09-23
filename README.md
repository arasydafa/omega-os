# OmegaOS UI (`@omega-os/ui`)

Design System fondasi untuk semua web Omega Throne: tools, opensource, portofolio, profile.

## Prinsip

- Modern minimalis, aksen: navy `#1E3A5F` (primary), maroon `#7B1E26` (danger only), dark-grey `#2B2F36`, white, black.
- Light mode default, dark via `class="dark"`.
- Typography: `Plus Jakarta Sans` (UI) + `JetBrains Mono` (code).
- Semua rounded: `8 / 12 / 16 / 20px`, dilarang `rounded-none`.
- Icon wajib `lucide-react`, dilarang emoji.

## Pakai

1. Import token di `src/index.css` / `main.tsx`:

```css
@import '@omega-os/ui/src/tokens.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Daftarkan preset di `tailwind.config.js`:

```js
export default {
  presets: [require('@omega-os/ui/tailwind.preset.js')],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
};
```

3. Pakai semantic class: `bg-ot-bg text-ot-text`, `bg-ot-surface border-ot-border rounded-ot-md`, `bg-navy text-white`, `bg-maroon text-white`.

## Status

v0.1 — token only. Belum ada komponen React.
