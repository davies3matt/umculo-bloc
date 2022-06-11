/* istanbul ignore file */
import { theme as chakraTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

export const colors = {
  grey: "#2D3047",
  purple: "#DC0073",
  pppurple: "#780EDC",
  blue: "#78E0DC",
  white: "#FBFAF5",
}

const theme = {
  ...chakraTheme,
  breakpoints,
  body: {
    bg: "#FFD015",
    color: "#000000",
  },
  fonts: {
    body: 'Barlow',
    mono: 'Barlow',
    heading: 'Barlow'
  },
  colors: {
    ...chakraTheme.colors,
    gray: '#2D3047',
    purple: '#DC0073',
    blue: '#780EDC',
    brand: {
      50: "#FFF3C2",
      100: "#FFEFAD",
      200: "#FFEB99",
      300: "#FFE270",
      400: "#FFDA47",
      500: "#FFD015",
      600: "#F5C400",
      700: "#CCA300",
      800: "#A38300",
      900: "#7A6200",
    },
    darkBrand: {
      50: "#ECF8F4",
      100: "#C5E9DC",
      200: "#95DBC1",
      300: "#76D0AF",
      400: "#58C69D",
      500: "#1F5B45",
      600: "#153D2E",
      700: "#0A1E17",
    },
    accent: {
      50: "#fff7db",
      100: "#ffe5ae",
      200: "#fdd57f",
      300: "#fbc44e",
      400: "#fab31f",
      500: "#FAB423",
      600: "#af7700",
      700: "#7e5500",
      800: "#4c3300",
      900: "#1d1000",
    },
    success: {
      50: "#e3fbee",
      100: "#c3ebd7",
      200: "#a0dcbf",
      300: "#7ccda7",
      400: "#59bf8e",
      500: "#40a674",
      600: "#30815a",
      700: "#205c40",
      800: "#0e3825",
      900: "#001509",
    },
    neutral: {
      50: "#EBEBEB",
      100: "#CCCCCC",
      200: "#C2C2C2",
      300: "#ADADAD",
      400: "#999999",
      500: "#8C8C8C",
      600: "#666666",
      700: "#333333",
      800: "#1F1F1F",
      900: "#000000",
    },
    peach: {
      50: "#FDDBC7",
      100: "#FFCBAD",
      200: "#FFBE99",
      300: "#FFB185",
      400: "#FFA570",
      500: "#FF9559",
      600: "#FF8B47",
      700: "#FF7E33",
      800: "#FF711F",
      900: "#FF640A",
    },
    disabledColor: "#DCDCDB",
    disabledColorDark: "#B1B2B1",
    errorColor: "#EB5757",
  },
  iconBackgroundColor: "#FFE066",
  boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.28)",
  gridGutter: 1, // rem - taken from Chakra UI space scale https://chakra-ui.com/theme#spacing
  brandLinearGradient:
    "linear-gradient(180deg, #FFDD57 0%, rgba(255, 208, 21, 0.1) 100%)",
  brandDarkLinearGradient:
    "linear-gradient(180deg, #FFD015 0%, rgba(255, 208, 21, 0.1) 100%)",
  borders: {
    lightBrand: "1.5px solid #FFEB99",
    lightBrandDashed: "1.5px dashed #FFEB99",
    brand: "1.5px solid #FFD015",
    grey: "1.5px solid #B1B2B1",
    disabled: "1px solid #DCDCDB",
  },
  responsive: {
    width: {
      default: { base: "100%", md: "80%", lg: "60%" },
    },
  },
}

export default theme
