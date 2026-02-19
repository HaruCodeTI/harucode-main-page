import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1120px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'rgba(255,255,255,0.06)',
        input: 'rgba(255,255,255,0.06)',
        ring: '#8B5CF6',
        background: '#09090B',
        foreground: '#FAFAFA',
        primary: {
          DEFAULT: '#8B5CF6',
          foreground: '#FAFAFA',
        },
        secondary: {
          DEFAULT: '#111113',
          foreground: '#FAFAFA',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FAFAFA',
        },
        muted: {
          DEFAULT: '#111113',
          foreground: 'rgba(255,255,255,0.55)',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          foreground: '#FAFAFA',
        },
        popover: {
          DEFAULT: '#111113',
          foreground: '#FAFAFA',
        },
        card: {
          DEFAULT: '#111113',
          foreground: '#FAFAFA',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '10px',
        sm: '8px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
