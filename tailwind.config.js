/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7e6',
          100: '#ffecb8',
          200: '#ffd980',
          300: '#ffc247',
          400: '#ffad1f',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        accent: '#10b981',
        surface: '#0f172a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 50px -12px rgba(15, 23, 42, 0.18)',
      },
    },
  },
  plugins: [],
};
