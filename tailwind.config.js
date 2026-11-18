/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      md: "810px",
      xl: "1200px",
    },
    extend: {
      colors: {
        ink: "#111111",
        cream: "#FAF7F3",
        mute: "rgba(17, 17, 17, 0.5)",
      },
      fontFamily: {
        sans: ["Archivo", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.02em",
        body: "-0.04em",
      },
    },
  },
  plugins: [],
};
