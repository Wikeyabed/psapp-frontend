import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { SwipeableDrawer } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Link from "../../../../src/Link";
import Logo from "./Logo";
import MobileFilterBar from "../../shop/products/MobileFilterBar";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

const drawerWidth = 240;

const navItems = [
  { title: "بلاگ", link: "/blog" },
  { title: "فرم سفارش محصول", link: "/order" },
  { title: "فرم درخواست همکاری", link: "/partnership" },
  { title: "تماس با ما", link: "/contact" },
];

function TopNavMobile(props) {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );
  const router = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        sx={{
          py: 2,
        }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Logo />
      </Box>

      <Divider />
      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              component={Link}
              href={item.link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}

        {isAdminLoggedIn ? (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              href="/admin"
              sx={{ textAlign: "center", color: "red" }}
            >
              <ListItemText primary={"ورود به پنل ادمین"} />
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", direction: "ltr !important" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: 1,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon
              sx={{
                fontSize: 40,
              }}
              color="secondary"
            />
          </IconButton>
          <Box>
            <Logo small={true} />
          </Box>
        </Toolbar>
        {router.pathname === "/shop" ? <MobileFilterBar /> : ""}
      </AppBar>

      <Box component="nav">
        <SwipeableDrawer
          onOpen={() => console.log("mobile nav oepened")}
          anchor="left"
          disableBackdropTransition={true}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              direction: "ltr !important",
              width: drawerWidth,
              position: "absolute",
              right: "0",
            },
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

TopNavMobile.propTypes = {
  window: PropTypes.func,
};

export default TopNavMobile;
