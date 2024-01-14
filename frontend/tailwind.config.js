import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        error: '#e29578',
        primary: '#006d77',
        secondary: '#89c8c0',
        success: '#83c5be',
        warning: '#ffddd2',
        dark: '#000000',
        supportingGrey: '#6D6D6D',
        warningRed: '#9B0000',
        risingGreen: '#2E6B75',
        settingOrange: '#DA7F00',
        linkingBlue: '#0036A7'
      },
      borderColor: {
        input: '#7b7b7b',
      },
    },
  },
  plugins: [],
}