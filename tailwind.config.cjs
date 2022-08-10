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
      light: "#ffffff",
      dark: "#333333",
      green: "#228c77",
      orange: "#f5762c",
    },
    fontFamily: {
      sans: ["Questrial", "sans-serif"],
      serif: ["DM\\ Serif\\ Display", "serif"],
    },
    container: {
      padding: "1.5rem",
      center: true,
    },
    extend: {},
  },
  plugins: [],
};
