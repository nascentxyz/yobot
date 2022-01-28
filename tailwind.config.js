module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        zinc: "#27272a",
        yobotgreen: "#B7FF1D",
        yobotblue: "#004CFF",

      },
      fontFamily: {
        sans: ["Rubik"],
        Rubik: ["Rubik", "sans-serif"],
        Roboto: ["Roboto Mono", "monospace"],
      },
      height: {
        80: "80px",
      },
      width: {
        530: "530px",
        437: "437px",
      },
      minWidth: {
        530: "530px",
        437: "437px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
