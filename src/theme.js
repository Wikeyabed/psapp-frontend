import { createTheme } from "@mui/material/styles";
import {
  red,
  grey,
  blue,
  deepPurple,
  brown,
  orange,
  green,
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
      gradient: "linear-gradient(to bottom, #6366f1, #06b6d4)",
      main: "#6366f1",
      lightBg: "#fefefe",
      text: "#222",
      textWhite: "#fff",
      dark: grey[900],
      purple: deepPurple[600],
      blue: blue[600],
      orange: orange[600],
      brown: brown[600],
      borderRadius: "20px",
      borderColor: blue[500],
      success: green[400],
    },
    secondary: {
      main: "#ec9d50",
      text: "#444",
    },

    lightPrimary: {
      main: "#FF5719",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
