import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf5",
          100: "#d5f8e5",
          500: "#20a56b",
          600: "#168456",
          700: "#116b49",
          900: "#0b352a",
        },
        copper: {
          100: "#f9e7d1",
          500: "#c8763c",
          600: "#a95e2e",
        },
        ink: "#17211d",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(23, 33, 29, 0.10)",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
