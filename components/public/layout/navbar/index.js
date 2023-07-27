import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";
import ToolbarIcons from "./Toolbar";
import SearchBar from "./SearchBar";
import TopMenu from "./TopMenu";
import BottomNav from "./BottomNav";
import MiniShoppingCart from "./shoppingCart/index";
import TopNavMobile from "./TopNavMobile";
import Logo from "./Logo";

export default function Navbar() {
  // mobile menu item

  return (
    <>
      {/* bottom menu for mobile */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <BottomNav />
        <TopNavMobile />
      </Box>

      {/* main menu for pc and laptop */}
      <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
        <AppBar
          sx={{
            backgroundColor: "primary",
            paddingY: 1,
            marginBottom: 4,
          }}
          position="static"
        >
          <Toolbar>
            {/*  Title and logo */}
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: "none", sm: "block" },
                color: "primary.lightbg",
              }}
            >
              ایباکس
            </Typography> */}
            <Logo />

            {/* <Box
              sx={{
                flexGrow: 2,
                display: "flex",
                color: "primary.lightbg",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              <Typography variant="caption">
                0912-8169771 : شماره تماس
              </Typography>
            </Box> */}

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

            <Box sx={{ display: "flex" }}>{/* <SearchBar /> */}</Box>

            {/* navbar  icons  */}
            <MiniShoppingCart />
            <Divider
              orientation="vertical"
              sx={{
                color: "#fff",
                backgroundColor: "#999",
                marginX: "5px",
                height: "50%",
              }}
            />
            <ToolbarIcons />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
