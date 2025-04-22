/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
