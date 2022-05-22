import { extendTheme } from "native-base"
import images from "./images"
import animations from "./animations"

const theme = extendTheme({
  colors: {
    primary: {
      50: "#ace2e3",
      100: "#a8ded1",
      200: "#95d7c8",
      300: "#83d0be",
      400: "#70c9b4",
      500: "#4bbba1",
      600: "#3a9983",
      700: "#338773",
      800: "#2c7463",
      900: "#1e4f44",
    },
    secondary: {
      50: "#1bb7ea",
      100: "#1296c1",
      200: "#1084a9",
      300: "#0d7192",
      400: "#0b5f7b",
      500: "#073b4c",
      600: "#03171d",
      700: "#010506",
      800: "#000000",
      900: "#000000",
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

export { theme, images, animations }
