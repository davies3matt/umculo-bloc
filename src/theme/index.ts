import { extendTheme } from "native-base"

const theme = extendTheme({
  colors: {
    // primary: {
    //     50: "#EBFAF8",
    //     100: "#C6F1EA",
    //     200: "#A1E8DD",
    //     300: "#7CDFCF",
    //     400: "#57D6C2",
    //     500: "#33CCB4",
    //     600: "#28A490",
    //     700: "#1E7B6C",
    //     800: "#145248",
    //     900: "#0A2924"
    //   },
    primary: {
      50: "#E8FDFC",
      100: "#BEF9F6",
      200: "#93F5F1",
      300: "#69F2EB",
      400: "#3FEEE6",
      500: "#15EAE0",
      600: "#11BBB3",
      700: "#0D8C87",
      800: "#085E5A",
      900: "#042F2D",
    },
    secondary: {
      50: "#FBE9F4",
      100: "#F5C2DF",
      200: "#EE9ACB",
      300: "#E873B7",
      400: "#E24BA3",
      500: "#DB248E",
      600: "#AF1D72",
      700: "#831655",
      800: "#580E39",
      900: "#2C071C",
    },
    accent: {
      50: "#F2F2F2",
      100: "#DBDBDB",
      200: "#C4C4C4",
      300: "#ADADAD",
      400: "#969696",
      500: "#808080",
      600: "#666666",
      700: "#4D4D4D",
      800: "#333333",
      900: "#1A1A1A",
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
  },
})

export { theme }

export { default as images } from "./images"
