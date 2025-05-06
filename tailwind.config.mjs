const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFD700",
          green: "#34D399",
          dark: "#1F2937",
        },
        primary: "#FF7E5F",
        secondary: "#FEB47B",
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          700: "#374151",
        },
      },
    },
  },
  plugins: [],
};

export default config;
