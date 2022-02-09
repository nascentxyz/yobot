module.exports = {
  purge: [],
  content: [
    './pages/**/*.{html,js,ts,tsx}',
    './components/**/*.{html,js,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["18px", "26px"],
      xl: ["24px", "32px"],
      xxl: ["36px", "42px"],
      xxxl: ["40px", "48px"],
    },
    extend: {
      colors: {
        zinc: "#27272a",
        yobotgreen: "#B7FF1D",
        yobotblue: "#004CFF",
        yobotbluehover: "#285EDC",
        yobotblack: "#121212",
        textgray: "#929292",
        textgraylight: "#d4d4d8",
        background: "#18181b",
      },
      fontFamily: {
        sans: ["Rubik"],
        Rubik: ["Rubik", "sans-serif"],
        Roboto: ["Roboto Mono", "monospace"],
      },
      height: {
        80: "80px",
        56: "56px",
      },
      width: {
        460: "460px",
        437: "437px",
      },
      minWidth: {
        530: "530px",
        437: "437px",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["disabled"],
    },
  },
  plugins: ["postcss-import", "tailwindcss", "autoprefixer"],
};
