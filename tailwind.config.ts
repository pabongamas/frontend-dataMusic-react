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
      colors:{
        "principal":"#191414",
        "like":"#1DB954",
        "liked":"#191414",
        "sub":"#b3b3b3"
      },
      padding: {
        'bottom-full': '100%',
      },
      screens: {
        'mobil': '50px',
      },
    },
  },
  plugins: [],
};
export default config;
