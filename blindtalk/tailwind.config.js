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
        "black-100": "#082427",
        "black-200": "#183634",
        "green-100": "#A5C6BF",
      },
      spacing: {
        100: "32rem",
      },
    },
  },
  plugins: [],
};
