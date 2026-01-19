/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-dark': '#0f172a',
        'space-cyan': '#06b6d4',
        'space-emerald': '#10b981',
      },
    },
  },
  plugins: [],
}

