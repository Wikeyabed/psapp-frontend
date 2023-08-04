import Navbar from "./Navbar";
import { Grid, Box } from "@mui/material";
import NavigationBar from "./Navigation";
import theme from "../../../src/theme";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Error from "../../../pages/404";
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
              lg={1.5}
              xs={12}
              sx={{
                position: "relative",
              }}
            >
              <Box>
                <Navbar />
              </Box>
            </Grid>
            <Grid item xs={12} lg={10.5}>
              <Grid sx={{ mb: 5 }} item xs={12}>
                <NavigationBar />
              </Grid>

              <Grid item lg={9} sx={{ mx: "auto" }}>
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
