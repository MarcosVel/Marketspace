import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    blue: {
      800: "#364D9D",
      400: "#647AC7",
    },
    gray: {
      700: "#1A181B",
      600: "#3E3A40",
      500: "#5F5B62",
      400: "#9F9BA1",
      300: "#D9D8DA",
      200: "#EDECEE",
      100: "#F7F7F8",
    },
    red: {
      400: "#EE7979",
    },
  },
  fonts: {
    heading: "Karla_700Bold",
    body: "Karla_400Regular",
  },
  fontSizes: {
    lg: 20,
    xl: 24,
  },
});
