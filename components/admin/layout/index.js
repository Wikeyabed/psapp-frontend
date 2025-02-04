import Navbar from "./Navbar";
import { Grid, Box } from "@mui/material";
import NavigationBar from "./Navigation";
import theme from "../../../src/theme";
import { useSelector } from "react-redux";
function AdminLayout({ children }) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );

  return (
    <>
      {isAdminLoggedIn ? (
        <Box
          sx={{
            backgroundColor: theme.palette.primary.lightBg,
          }}
        >
          <Grid container>
            <Grid
              item
              lg={2}
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <Box>
                <Navbar />
              </Box>
            </Grid>
            <Grid item xs={12} lg={10}>
              <Grid sx={{ mb: 5, p: 1 }} item xs={12}>
                <NavigationBar />
              </Grid>

              <Grid item lg={10} sx={{ mx: "auto", p: 3 }}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

export default AdminLayout;
