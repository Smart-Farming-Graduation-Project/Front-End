import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#e6f4ea",
          100: "#cce9d5",
          200: "#99d3ab",
          300: "#66bd81",
          400: "#339057",
          500: "#228b22",
          600: "#1f7e1f",
          700: "#1a6c1a",
          800: "#155a15",
          900: "#104810",
          DEFAULT: "#228b22",
        },
        yellow: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffd54f",
          400: "#ffca28",
          500: "#eec044",
          600: "#e6b800",
          700: "#d6a800",
          800: "#c69800",
          900: "#b68900",
          DEFAULT: "#eec044",
        },
        gray: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          DEFAULT: "#334155",
        },
        black: {
          50: "#d1d5db",
          100: "#9ca3af",
          200: "#6b7280",
          300: "#4b5563",
          400: "#374151",
          500: "#1f2937",
          600: "#1c1c1c",
          700: "#171717",
          800: "#121212",
          900: "#0f172a",
          DEFAULT: "#0f172a",
        },
        white: {
          50: "#ffffff",
          100: "#ffffff",
          200: "#f9fafb",
          300: "#f3f4f6",
          400: "#e5e7eb",
          500: "#d1d5db",
          600: "#9ca3af",
          700: "#6b7280",
          800: "#4b5563",
          900: "#374151",
          DEFAULT: "#ffffff",
        },

        "hover-button": "#41a23d",
        "light-green-section": "rgba(236, 255, 232, 0.479)",
        "light-yellow-section": "#f8f7f0",
        "light-blue-section": "#e8eff0",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        bounce: "bounce 1s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(-5px)",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
