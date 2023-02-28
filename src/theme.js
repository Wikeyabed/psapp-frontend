import { createTheme } from "@mui/material/styles";
import { red, grey, indigo, green } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  labelStyles: {
    "& label": {
      transformOrigin: "right !important",
      left: "inherit !important",
      right: "1.75rem !important",
      overflow: "unset",
    },
  },
  direction: "rtl",
  palette: {
    primary: {
      main: indigo[800],
      lightBg: "#fafafa",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
