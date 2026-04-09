/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FA8232",
          50: "#FFF5EC",
          100: "#FFE6CC",
          200: "#FFCC99",
          500: "#FA8232",
          600: "#E06E1F",
          700: "#C55A0A",
        },
        dark: {
          DEFAULT: "#191C1F",
          100: "#303639",
          200: "#475156",
          300: "#5F6C72",
          400: "#77878F",
        },
        gray: {
          50: "#F2F4F5",
          100: "#E4E7E9",
          200: "#C9CFD2",
          300: "#ADB7BC",
        },
        success: "#2DB224",
        warning: "#EFD33D",
        danger: "#EE5858",
        info: "#2DA5F3",
        accent: {
          navy: "#003A66", // dark blue bg
          blue: "#005D8D", // header blue
          yellow: "#EFD33D", // "Black Friday" ribbon
        },
      },
      fontFamily: {
        sans: ['"Public Sans"', "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 4px 16px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
