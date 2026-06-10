import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#1B2A4A', 800: '#16223C', 900: '#101A2E', 950: '#0B1322' },
        orange: { DEFAULT: '#E87722', hover: '#D2691E', light: '#FFF3E8' },
        body: '#2D3748',
        subdued: '#718096',
        lightbg: '#F7FAFC',
        rowalt: '#EDF2F7',
        divider: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(16,26,46,0.08), 0 1px 2px rgba(16,26,46,0.04)',
        cardHover: '0 6px 16px rgba(16,26,46,0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
