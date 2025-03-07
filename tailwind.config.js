/** @type {import('tailwindcss').Config} */
const { heroui } = require("@heroui/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        keyframes: {
            blink: {
              '50%': { opacity: 0 },
            },
          },
          animation: {
            blink: 'blink 1s step-start infinite',
          },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

