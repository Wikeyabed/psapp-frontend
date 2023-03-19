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
        <Grid item lg={1.5} xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12} lg={10.5}>
          <Grid sx={{ mb: 5 }} item xs={12}>
            {/* <Box sx={{ width: "100%", height: "50px" }}> */}{" "}
            <NavigationBar />
            {/* </Box> */}
          </Grid>

          <Grid item lg={10} sx={{ mx: "auto" }}>
            {" "}
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminLayout;
