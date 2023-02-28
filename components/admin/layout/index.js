import Navbar from "./Navbar";
import { Grid, Box } from "@mui/material";
import NavigationBar from "./Navigation";
import theme from "../../../src/theme";

function AdminLayout({ children }) {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.lightBg,
      }}
    >
      <Grid container>
        <Grid item xs={1.5}>
          <Navbar />
        </Grid>
        <Grid item xs={10.5}>
          <NavigationBar />
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminLayout;
