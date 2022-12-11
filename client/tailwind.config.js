const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: '#efefef',
        'light-gray': '#f8f8f8',
        'dark-gray': '#757575',

        // ...
      },
    },
  },
  plugins: [],
};
