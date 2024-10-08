import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // principal: "#191414",
        // like: "#1DB954",
        liked: "#191414",
        sub: "#b3b3b3",
        rowList: "#121212",
        rowListH: "#2A2A2A",
        principalH: "#1f1f1f",
        principal: {
          DEFAULT: "#020202",
          100: "#010101",
          200: "#010101",
          300: "#020202",
          400: "#020202",
          500: "#020202",
          550:"#191414",
          580:"#282828",
          600: "#353535",
          700: "#686868",
          800: "#9a9a9a",
          900: "#cdcdcd",
        },
        dark_green: {
          DEFAULT: "#0d2818",
          100: "#020805",
          200: "#050f09",
          300: "#07170e",
          400: "#0a1f12",
          500: "#0d2818",
          600: "#236c40",
          700: "#39b169",
          800: "#74d29a",
          900: "#bae9cc",
        },
        pakistan_green: {
          DEFAULT: "#04471c",
          100: "#010e06",
          200: "#021d0b",
          300: "#032b11",
          400: "#033a16",
          500: "#04471c",
          600: "#099a3c",
          700: "#0eec5c",
          800: "#5bf591",
          900: "#adfac8",
        },
        sea_green: {
          DEFAULT: "#058c42",
          100: "#011c0d",
          200: "#02371a",
          300: "#035327",
          400: "#046e34",
          500: "#058c42",
          600: "#08d162",
          700: "#2af787",
          800: "#71faaf",
          900: "#b8fcd7",
        },
        like: {
          DEFAULT: "#16db65",
          100: "#042c14",
          200: "#095728",
          300: "#0d833c",
          400: "#11af50",
          500: "#16db65",
          600: "#3aec81",
          700: "#6bf0a1",
          800: "#9df5c0",
          900: "#cefae0",
        },
      },
      padding: {
        "bottom-full": "100%",
      },
      screens: {
        mobil: "50px",
      },
    },
  },
  plugins: [],
};
export default config;
