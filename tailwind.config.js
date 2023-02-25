/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: "#ffc017",
        lightblack: "rgb(25, 25, 25)",
        lighterblack: "rgb(41, 41, 41)",
        "subtle-white": "rgb(242, 242, 242)",
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
        bold: [
          "sohne-bold",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        sans: ["sohne", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        title: [
          "fell",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],

        "content-serif": [
          "content-font",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],

        "source-serif-pro": [
          "source-serif-pro",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
      },

      keyframes: {
        shake: {
          "0%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(8px)",
          },
          "50%": {
            transform: "translateX(-8px)",
          },
          "75%": {
            transform: "translateX(8px)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },

        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        "scale-in": {
          "0%": {
            transform: "scale(0.35)",
          },

          "100%": {
            transform: "scale(1)",
          },
        },
      },

      animation: {
        shake: "0.4s shake",
        "fade-in":
          "fade-in 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s 1 normal forwards running",
        "scale-in":
          "scale 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s 1 normal forwards running",

        "fade-scale-in":
          "fade-in 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s 1 normal forwards running, scale-in 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0s 1 normal forwards running",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
