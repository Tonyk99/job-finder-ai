import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#0D0E11',
        'brand-card': '#1A1B24',
        'brand-teal': '#00A896',
        'brand-purple': '#6D28D9',
        'brand-border': '#374151',
        'brand-text-subtle': '#A0AEC0',
        'brand-text-bright': '#F7FAFC',
        'brand-match': '#00B8A9',
      },
    },
  },
  plugins: [],
};
export default config;
