module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
    },
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
