/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        terminal: ["Courier New", "monospace"],
      },
      colors: {
        matrix: "#39ff14",
        terminalbg: "#000000",
      },
    },
  },
  plugins: [],
};