import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#020817',
          700: '#1F2937',
          800: '#1E293B',
          900: '#0B1220',
          950: '#020817',
        },
        gold: {
          DEFAULT: '#FBBF24',
          hover: '#F59E0B',
          soft: '#FCD34D',
          light: '#FBBF2419',
          border: '#4B3511',
          card: '#2A1F0C',
        },
        // Aliases for backward compat
        orange: {
          DEFAULT: '#FBBF24',
          hover: '#F59E0B',
          light: '#FBBF2419',
        },
        surface: {
          DEFAULT: '#0B1220',
          alt: '#111827',
          muted: '#1E293B',
        },
        body: '#E2E8F0',
        subdued: '#94A3B8',
        lightbg: '#0B1220',
        rowalt: '#1E293B',
        divider: '#1F2937',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
        cardHover: '0 6px 16px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
};
export default config;