/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1600px",
    },
    colors: {
      light: "#F4F4F9",
      green: "#228c77",
      orange: "#F9A620",
    },
    fontFamily: {
      sans: ["Satoshi", "sans-serif"],
      display: ["Clash", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
