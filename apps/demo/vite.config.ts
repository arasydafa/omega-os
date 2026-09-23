import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Linked workspace packages (UI tokens, fontsource files) live
      // outside the demo root and must be servable in dev.
      allow: ['../..'],
    },
  },
});
