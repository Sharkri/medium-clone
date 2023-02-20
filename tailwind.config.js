/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#ffc017",
        lightblack: "rgb(25, 25, 25)",
        lighterblack: "rgb(41, 41, 41)",
      },
      fontFamily: {
        serif: [
          "gt-super",
          "ui-serif",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },
    },
  },
  plugins: [],
};
