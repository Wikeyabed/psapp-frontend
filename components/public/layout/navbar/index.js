import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import ToolbarIcons from "./Toolbar";
import SearchBar from "./SearchBar";
import TopMenu from "./TopMenu";
import BottomNav from "./BottomNav";

export default function Navbar() {
  // mobile menu item

  return (
    <>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <BottomNav />
      </Box>

      <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: "primary.lightBg",
          }}
          position="static"
        >
          <Toolbar>
            {/*  Title and logo */}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "primary.main",
              }}
            >
              ایباکس
            </Typography>

            <Box
              sx={{
                flexGrow: 2,
                display: "flex",
                color: "#000",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <Typography variant="caption">
                0912-8169771 : شماره تماس
              </Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 4,
                display: "flex",
                color: "#000",
                justifyContent: "center",
              }}
            >
              {" "}
              <TopMenu />
            </Box>

            <Box sx={{ display: "flex" }}>
              <SearchBar />
            </Box>

            {/* navbar  icons  */}

            <ToolbarIcons />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
