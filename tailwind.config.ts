import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // BLENDMI official brand palette
        ink: "#0D0D0D", // INK BLACK
        cream: "#FFF0E6", // CREAM
        creamdark: "#F6E1D2",
        pink: {
          DEFAULT: "#FF28BA", // ODD PINK
          soft: "#FFD6E4", // SOFT PINK
          pale: "#FFE6F1", // lighter tint for backgrounds
          deep: "#E0009E", // darker odd pink for hovers
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      keyframes: {
        blink: {
          "0%, 92%, 100%": { transform: "scaleY(1)" },
          "96%": { transform: "scaleY(0.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 4s infinite",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
