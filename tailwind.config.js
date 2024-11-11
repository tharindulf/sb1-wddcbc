/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        beige: '#d4c7b9',
        cream: '#f4f1ed',
        sage: '#cad5c2',
        peach: '#f7e3d0',
        pink: '#f2d7e3',
        'soft-blue': '#dde3ed',
        'dark-green': '#2F4F4F'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};