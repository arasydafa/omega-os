/** @type {import('tailwindcss').Config} */
export default {
  presets: [require('@omega-os/ui/tailwind.preset.js')],
  // The UI package source must be included so Tailwind generates
  // the classes used inside library components.
  content: ['./index.html', './src/**/*.{ts,tsx}', '../../src/**/*.{ts,tsx}'],
};
