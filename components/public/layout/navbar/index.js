import { AppBar, Box, Divider, Toolbar, Typography } from "@mui/material";
import ToolbarIcons from "./Toolbar";
import SearchBar from "./SearchBar";
import TopMenu from "./TopMenu";
import BottomNav from "./BottomNav";
import MiniShoppingCart from "./shoppingCart/index";
import TopNavMobile from "./TopNavMobile";
import Logo from "./Logo";
import SocialMediaBar from "../socialMedia";

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
            backgroundColor: "#3e2723",
            paddingY: 1,
            marginBottom: 4,
          }}
          position="fixed"
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
            <Box flexGrow={1}>
              <Logo />
            </Box>

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
                flexGrow: 1,
                display: "flex",
                color: "#000",
              }}
            >
              {" "}
              <TopMenu />
            </Box>

            <Box
              sx={{
                position: "fixed",
                left: 25,
                top: 100,
                left: 0,
                paddingRight: "15px",
                py: "10px",
                ml: 1,
                borderBottomRightRadius: "20px",
                borderBottomLeftRadius: "20px",
              }}
            >
              {" "}
              <SocialMediaBar />
            </Box>

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
