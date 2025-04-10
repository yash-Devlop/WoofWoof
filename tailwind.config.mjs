// tailwind.config.mjs
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        saira: ["var(--font-saira-condensed)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
