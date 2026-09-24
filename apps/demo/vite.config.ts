import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Dev always uses UI source; published consumers resolve dist instead.
    // Exact match only so deep imports (tokens.css) keep resolving normally.
    alias: [
      {
        find: /^@omega-os\/ui$/,
        replacement: fileURLToPath(new URL('../../src/index.ts', import.meta.url)),
      },
    ],
  },
  server: {
    fs: {
      // Linked workspace packages (UI tokens, fontsource files) live
      // outside the demo root and must be servable in dev.
      allow: ['../..'],
    },
  },
});
