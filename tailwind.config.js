/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "551.98px",
      md: "728px",
      lg: "903.98px",
      xlg: "1080px",
    },

    extend: {
      colors: {
        yellow: "#ffc017",
        lightblack: "rgb(25, 25, 25)",
        lighterblack: "rgb(41, 41, 41)",
        "subtle-white": "rgb(242, 242, 242)",
        green: "#1a8917",
        "dark-green": "#0f730c",
        grey: "#757575",
      },

      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "22px",
            },
            h2: {
              fontSize: "20px",
            },
            h3: {
              fontSize: "18px",
            },
            p: {
              fontSize: "20px",
              overflowWrap: "anywhere",
            },
          },
        },
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
        "sohne-italic": [
          "sohne-italic",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        "sohne-bold": [
          "sohne-bold",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        "sohne-semibold": [
          "sohne-semibold",
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
          "content-serif",
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
        "source-serif-pro-bold": [
          "source-serif-pro-bold",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        "content-sans": [
          "content-sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
        ],

        "content-sans-bold": [
          "content-sans-bold",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Open Sans",
          "Helvetica Neue",
          "sans-serif",
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

        scale: {
          "35%": {
            transform: "scale(1.1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },

        open: {
          "0%": {
            transform: "translateY(-20px)",
          },

          "100%": {
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        shake: "0.4s shake",
        "fade-in": "fade-in 300ms",
        "scale-in": "scale-in 300ms",
        scale: "scale 300ms",
        "fade-scale-in": "fade-in 300ms, scale-in 300ms",
        open: "open 0.56s, fade-in 0.56s",
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities, addVariant }) {
      addUtilities({
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".break-word": {
          "word-break": "break-word",
        },

        ".thin-icon:before": {
          "-webkit-text-stroke": "0.3px white",
        },

        ".thinner-icon:before": {
          "-webkit-text-stroke": "1px white",
        },

        ".thinnest-icon:before": {
          "-webkit-text-stroke": "2px white",
        },
      });
    }),

    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
