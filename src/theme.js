import { createTheme } from "@mui/material/styles";
import {
  red,
  grey,
  indigo,
  green,
  blue,
  deepPurple,
  brown,
  teal,
  orange,
  purple,
} from "@mui/material/colors";

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
      main: "#49344f",
      lightBg: "#FCF9FF",
      lightDarker: "#f9f3ff",
      dark: grey[900],
      purple: deepPurple[600],
      blue: blue[600],
      orange: orange[600],
      brown: brown[600],
      borderRadius: "10px",
      borderColor: blue[500],
    },
    secondary: {
      main: "#445486",
    },
    lightPrimary: {
      main: "#6E5176",
    },

    error: {
      main: red.A400,
    },
  },
});

export default theme;
