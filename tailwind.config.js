/** @type {import('tailwindcss').Config} */
config = {
  darkMode: ["class"],

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/context/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        /* full palette scales */
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
          950: "var(--neutral-950)",
        },
        terracotta: {
          50: "var(--terracotta-50)",
          100: "var(--terracotta-100)",
          200: "var(--terracotta-200)",
          300: "var(--terracotta-300)",
          400: "var(--terracotta-400)",
          500: "var(--terracotta-500)",
          600: "var(--terracotta-600)",
          700: "var(--terracotta-700)",
          800: "var(--terracotta-800)",
          900: "var(--terracotta-900)",
          950: "var(--terracotta-950)",
        },
        yellow: {
          50: "var(--yellow-50)",
          100: "var(--yellow-100)",
          200: "var(--yellow-200)",
          300: "var(--yellow-300)",
          400: "var(--yellow-400)",
          500: "var(--yellow-500)",
          600: "var(--yellow-600)",
          700: "var(--yellow-700)",
          800: "var(--yellow-800)",
          900: "var(--yellow-900)",
          950: "var(--yellow-950)",
        },
        green: {
          50: "var(--green-50)",
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
          950: "var(--green-950)",
        },
        teal: {
          50: "var(--teal-50)",
          100: "var(--teal-100)",
          200: "var(--teal-200)",
          300: "var(--teal-300)",
          400: "var(--teal-400)",
          500: "var(--teal-500)",
          600: "var(--teal-600)",
          700: "var(--teal-700)",
          800: "var(--teal-800)",
          900: "var(--teal-900)",
          950: "var(--teal-950)",
        },

        surface: "var(--surface)",
        "surface-accent": "var(--surface-accent)",
        "surface-accent-2": "var(--surface-accent-2)",

        /* homepage + footer tokens */
        "home-searchbox": "var(--color-home-searchbox)",
        "home-button": "var(--color-home-button)", // <- bg-home-button
        "home-text-secondary": "var(--color-home-text-secondary)",

        "footer-background": "var(--color-footer-background)",
        "footer-text": "var(--color-footer-text)",
        "footer-texthover": "var(--color-footer-texthover)",
        "footer-inputBackground": "var(--color-footer-inputBackground)",
        "footer-inputPlaceholder": "var(--color-footer-inputPlaceholder)",
        "footer-button": "var(--color-footer-button)",
        "footer-socialIcon": "var(--color-footer-socialIcon)",
        "footerhome-background": "var(--color-footerhome-background)",
        "footerhome-button": "var(--color-footerhome-button)",
        "footerhome-texthover": "var(--color-footerhome-texthover)",
        "footerhome-buttonhover": "var(--color-footerhome-buttonhover)",
      },

      /* map Tailwind color names to your CSS variables in tokens.css */

      scale: { 102: "1.02", 103: "1.03" },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    },
  },

  plugins: [],
};
export default config;
