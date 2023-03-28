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
  // spacing: 8,
  direction: "rtl",
  palette: {
    primary: {
      main: indigo[800],
      lightBg: "#fdfdfd",
      textColor: "#909090",
      borderRadius: "5px",
      borderColor: "#00aaff",
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
