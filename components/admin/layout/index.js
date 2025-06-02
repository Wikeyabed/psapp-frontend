import Navbar from "./Navbar";
import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import NavigationBar from "./Navigation";
import theme from "../../../src/theme";
import { useSelector } from "react-redux";

function AdminLayout({ children }) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      {isAdminLoggedIn ? (
        <Box
          sx={{
            backgroundColor: "#f8fafc",
            minHeight: "100vh",
            direction: "rtl",
            fontFamily: "'Segoe UI', Tahoma, sans-serif",
          }}
        >
          <Grid container>
            {/* Sidebar/Navbar */}
            <Grid
              item
              md={2}
              xs={12}
              sx={{
                position: isMobile ? "static" : "fixed",
                width: isMobile ? "100%" : "16.666%",
                height: isMobile ? "auto" : "100vh",
                zIndex: 10,
                boxShadow: isMobile ? "0 4px 6px -1px rgba(0,0,0,0.1)" : "none",
              }}
            >
              <Navbar />
            </Grid>

            {/* Main Content */}
            <Grid 
              item 
              xs={12} 
              md={10}
              sx={{
                paddingRight: isMobile ? 0 : "16.666%",
                paddingLeft: 0,
              }}
            >
              {/* Navigation Bar */}
              <Box
                sx={{
                  position: isMobile ? "static" : "sticky",
                  top: 0,
                  zIndex: 9,
                  backgroundColor: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  padding: 2,
                  mb: isMobile ? 2 : 4,
                }}
              >
                <NavigationBar />
              </Box>

              {/* Page Content */}
              <Box
                sx={{
                  mx: "auto",
                  p: isMobile ? 1.5 : 3,
                  maxWidth: 1200,
                }}
              >
                {children}
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </>
  );
}

export default AdminLayout;