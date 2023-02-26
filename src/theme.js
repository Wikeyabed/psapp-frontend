import { createTheme } from "@mui/material/styles";
import { red, grey, indigo } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: indigo.A400,
      lightBg: grey[50],
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
