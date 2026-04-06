/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clicon-blue': '#1B6392', // The exact blue from your image
      }
    },
  },
  plugins: [],
}