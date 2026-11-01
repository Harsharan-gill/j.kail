import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0D14",
        foreground: "#F5F5F7",
        navy: {
          950: "#07090E",
          900: "#0A0D14",
          850: "#0F1420",
          800: "#131A2B",
          750: "#182238",
          700: "#1F2B48",
          600: "#2B3C63",
        },
        gold: {
          100: "#FAF5E9",
          200: "#F5E9CC",
          300: "#EED8A1",
          400: "#E8D08A",
          500: "#C9A24B",
          600: "#AB8532",
          700: "#8C6A2B",
          800: "#6B501F",
          900: "#4A3614",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "Montserrat", "Poppins", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E8D08A 0%, #C9A24B 50%, #8C6A2B 100%)",
        "gold-gradient-hover": "linear-gradient(135deg, #FFF1C5 0%, #E8D08A 50%, #C9A24B 100%)",
        "navy-radial": "radial-gradient(circle at 50% 20%, rgba(201, 162, 75, 0.08) 0%, rgba(15, 20, 32, 0) 70%)",
      },
      boxShadow: {
        "gold-sm": "0 0 15px rgba(201, 162, 75, 0.25)",
        "gold-md": "0 0 30px rgba(201, 162, 75, 0.35)",
        "gold-lg": "0 0 50px rgba(201, 162, 75, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2.5s infinite linear",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
