import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: "var(--green)",
        yellow: "var(--yellow)",
        gray: "var(--gray)",
        black: "var(--black)",
        white: "var(--white)",
        "hover-button": "var(--hover-button)",
        "light-green-section": "var(--light-green-section)",
        "light-yellow-section": "var(--light-yellow-section)",
        "light-oil-section": "var(--light-oil-section)",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
  },
  plugins: [],
};
export default config;
