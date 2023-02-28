/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-5": "#f8f9fa",
        "basic-gray-5": "#f9f9f9",
        "basic-gray-10": "#f1f1f1",
      },
      spacing: {
        100: "32rem",
      },
    },
  },
  plugins: [],
};
