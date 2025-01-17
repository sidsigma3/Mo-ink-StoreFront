const { tailwindConfig } = require('@storefront-ui/react/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}","./node_modules/@storefront-ui/react/**/*.{js,mjs}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

