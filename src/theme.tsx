import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    black: "#16161D",
    white: "var(--chakra-colors-whiteAlpha-700)",
    buttonBlue: {
      100: "#2875e2",
      200: "#2875e2",
      300: "#2875e2",
      400: "#2875e2",
      500: "#2875e2",
      600: "#2469CB",
      700: "#205DB4",
      800: "#1C519E",
      900: "#184687",
    },
  },
  fonts,
  breakpoints,
});

export default theme;
