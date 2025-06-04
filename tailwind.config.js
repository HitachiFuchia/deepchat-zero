/** @type {import('tailwindcss').Config} */
export default {
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
