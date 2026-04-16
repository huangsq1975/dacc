
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'sans': ['Montserrat', 'sans-serif'],
          'space': ['Montserrat', 'sans-serif'],
          'montserrat': ['Montserrat', 'sans-serif'],
        },
        keyframes: {
          gradient: {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          }
        },
        animation: {
          gradient: 'gradient 3s linear infinite',
        }
      },
    },
    plugins: [],
  }
