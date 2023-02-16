/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titillium: ["Titillium Web", "sans-serif"],
      },
      colors: {
        header: {
          logo: "#5CB85C",
        },
        mainPage: {
          userName: "#3d8b3d",
          date: "#bbb",
          black: "#373a3c",
          article: "#999",
          tegList: "#ddd",
          tagListColor: "#aaa",
        },
      },
      spacing: {
        navItem: "0.425rem",
        title: "3px",
        article: "15px",
        tagList: "0.2rem",
        0.6: "0.6em",
        0.2: "0.2rem",
        0.5: "0.5em",
        "1em": "1em",
        0.4: "0.4rem",
      },
      boxShadow: {
        banner:
          "inset 0 8px 8px -8px rgb(0 0 0 / 30%), inset 0 -8px 8px -8px rgb(0 0 0 / 30%)",
      },
      dropShadow: {
        banner: "0px 1px 3px rgb(0 0 0 / 30%)",
      },
      fontSize: {
        banner: "3.5rem",
        textAterBanner: "1.5rem",
        date: "0.8rem",
      },
      container: {
        center: true,
      },
      borderRadius: {
        0.2: "0.2rem",
        10: "10rem",
      },
      lineHeight: {
        1.3: "1.3rem",
      },
      maxWidth: {
        30: "30%",
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
