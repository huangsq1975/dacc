import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* TF Style Guide: Primary Blue, Secondary blue (accents), Tertiary grey (tags) — hex from brand implementation */
        navy: {
          950: '#04101e',
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#122a50',
          600: '#1a3a6a',
        },
        tfblue: {
          DEFAULT: '#005dec',
          medium: '#0066ff',
          light: '#d9e8ff',
          verylight: '#eef4ff',
          bright: '#0071bc',
        },
        tfgold: {
          DEFAULT: '#c9a55a',
          light: '#f0d9a0',
          dark: '#a07e35',
        },
        tfgray: {
          light: '#EBEBEB',
          medium: '#669999',
          section: '#7a898c',
        },
        tfcream: '#EDE8DA',
        /* Aegis-like cool neutrals */
        tfslate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        /* legacy utility name — same as approved body font (DM Sans) */
        inter: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        base: ['1rem', { lineHeight: '1.6' }],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
