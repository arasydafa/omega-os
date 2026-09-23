import { defineConfig } from 'vitest/config';

// esbuild (built into Vitest) handles TSX with the automatic JSX runtime,
// so no extra transform plugin is needed for tests.
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
});
