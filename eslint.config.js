import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import noEmoji from './eslint.rules/no-emoji.cjs';

export default tseslint.config(
  {
    ignores: ['node_modules/**', 'dist/**', 'apps/demo/dist/**', 'apps/demo/node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // Plain JS config files run in Node.
    files: ['**/*.config.js', 'eslint.rules/*.cjs', 'tailwind.preset.js'],
    languageOptions: { globals: globals.node },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'apps/demo/src/**/*.{ts,tsx}'],
    plugins: { local: { rules: { 'no-emoji': noEmoji } } },
    rules: {
      'local/no-emoji': 'error',
      // Allow empty arrow functions in default props patterns; keep it minimal.
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
);
