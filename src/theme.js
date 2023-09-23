import { createTheme } from "@mui/material/styles";
import {
  red,
  grey,
  blue,
  deepPurple,
  brown,
  orange,
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
      main: "#342121 ",
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
    },
    secondary: {
      main: "#DD925C",
      text: "#444",
    },

    lightPrimary: {
      main: "#74423B",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
