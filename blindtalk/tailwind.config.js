/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      maven: ["Maven Pro", "sans-serif"],
      pacifico: ["Pacifico", "cursive"],
    },
    extend: {
      colors: {
        "gray-5": "#f8f9fa",
        "basic-gray-5": "#f9f9f9",
        "basic-gray-10": "#f1f1f1",
        "gray-100": "#B0AEB3",
        "gray-200": "#F0F0F0",
        "gray-300": "#F8F8F8",
        "gray-400": "#D7D5D8",
        "black-100": "#082427",
        "black-200": "#183634",
        "green-100": "#A5C6BF",
      },
      spacing: {
        100: "32rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
