import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a0a1a",
        accent: "#7dda9a",
        "surface-tint": "#006d3b",
        surface: "#f7f9fb",
        "surface-container": "#eceef0",
        "surface-container-high": "#e6e8ea",
        "surface-container-low": "#f2f4f6",
        "surface-container-lowest": "#ffffff",
        "on-surface": "#191c1e",
        "on-surface-variant": "#47464f",
        "outline-variant": "#c8c5d0",
        neutral: "#F5F7FA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-manrope)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
