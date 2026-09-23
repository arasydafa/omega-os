/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Cascadia Code"', 'monospace'],
      },
      colors: {
        // Static brand scales (same hex in light + dark)
        navy: {
          50: '#EFF4FA',
          100: '#DCE7F3',
          200: '#B9CDE6',
          500: '#1E3A5F',
          600: '#162C4A',
          700: '#101F33',
          DEFAULT: '#1E3A5F',
        },
        maroon: {
          50: '#FAEDEF',
          100: '#F3D5D8',
          500: '#7B1E26',
          600: '#5F151D',
          700: '#471016',
          DEFAULT: '#7B1E26',
        },
        // Functional status — theme-aware via CSS vars (info=blue, warning=yellow, success=green, danger=maroon)
        info: { DEFAULT: 'var(--ot-info)', bg: 'var(--ot-info-bg)' },
        warning: { DEFAULT: 'var(--ot-warning)', bg: 'var(--ot-warning-bg)' },
        success: { DEFAULT: 'var(--ot-success)', bg: 'var(--ot-success-bg)' },
        danger: { DEFAULT: 'var(--ot-danger)', bg: 'var(--ot-danger-bg)' },
        // Semantic surfaces — switch via CSS vars in tokens.css
        ot: {
          bg: 'var(--ot-bg)',
          surface: 'var(--ot-surface)',
          'surface-2': 'var(--ot-surface-2)',
          border: 'var(--ot-border)',
          text: 'var(--ot-text)',
          muted: 'var(--ot-muted)',
        },
      },
      borderRadius: {
        'ot-sm': '8px',
        'ot-md': '12px',
        'ot-lg': '16px',
        'ot-xl': '20px',
      },
      boxShadow: {
        'ot-sm': 'var(--ot-shadow-sm)',
        'ot-md': 'var(--ot-shadow-md)',
        'ot-lg': 'var(--ot-shadow-lg)',
      },
      spacing: {
        'ot-1': 'var(--ot-space-1)',
        'ot-2': 'var(--ot-space-2)',
        'ot-3': 'var(--ot-space-3)',
        'ot-4': 'var(--ot-space-4)',
        'ot-6': 'var(--ot-space-6)',
        'ot-8': 'var(--ot-space-8)',
      },
    },
  },
  plugins: [],
};
