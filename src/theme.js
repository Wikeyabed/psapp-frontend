import { createTheme } from "@mui/material/styles";
import { red, grey, indigo, green, blue } from "@mui/material/colors";

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
  // spacing: 8,
  direction: "rtl",
  palette: {
    primary: {
      main: blue[900],
      lightBg: grey[50],
      textColor: grey[700],
      borderRadius: "5px",
      borderColor: blue[500],
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
