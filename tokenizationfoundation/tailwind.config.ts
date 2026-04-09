import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04101e',
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#122a50',
          600: '#1a3a6a',
        },
        tfblue: {
          DEFAULT: '#1a4f8a',
          medium: '#2d7dc7',
          light: '#d6e8f5',
          verylight: '#f0f7fc',
          bright: '#3264CC',
        },
        tfgold: {
          DEFAULT: '#c9a55a',
          light: '#f0d9a0',
          dark: '#a07e35',
        },
        tfgray: {
          light: '#EBEBEB',
          medium: '#909090',
          section: '#8C8C8C',
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
        /* Institutional fintech headline stack (cf. aegiscustody.com) */
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
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
