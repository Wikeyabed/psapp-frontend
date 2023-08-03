import React from "react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Skeleton,
} from "@mui/material";
import {
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Login as LoginIcon,
} from "@mui/icons-material";
import Link from "../../../../src/Link";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { userLogout } from "../../../../redux/reducers/authSlice";
import { deleteCookie } from "cookies-next";

function ToolbarMenu() {
  const isAdminLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn && state.auth.userInformation.r == "1"
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserLogout = async () => {
    setAnchorEl(null);
    deleteCookie("x-auth-token");
    dispatch(userLogout());
    router.push("/auth/login");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem href="/user" component={Link}>
        پروفایل
      </MenuItem>
      <MenuItem onClick={handleUserLogout}>خروج</MenuItem>

      {isAdminLoggedIn ? (
        <MenuItem
          sx={{
            color: "red",
          }}
          component={Link}
          href="/admin"
        >
          ورود به پنل ادمین
        </MenuItem>
      ) : (
        ""
      )}
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {user.isLoggedIn ? (
          <Box onClick={handleProfileMenuOpen}>
            <IconButton
              size="large"
              edge="start"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="info"
            >
              <AccountCircleIcon />
            </IconButton>
            <Typography
              sx={{
                mr: 1,
                color: "#e0e0e0",
                fontSize: "12px",
                display: "inline-block",
                mt: 1,
                cursor: "pointer",
              }}
            >
              {" "}
              {user.userInformation.firstName +
                " " +
                user.userInformation.lastName}
            </Typography>
          </Box>
        ) : (
          <Button
            component={Link}
            href="/auth/login"
            color="secondary"
            variant="outlined"
            sx={{
              fontSize: 16,
              padding: "2px 20px 7px 5px",
              backgroundColor: "#111",
              marginRight: "5px",
            }}
            endIcon={
              <LoginIcon
                color="warning"
                sx={{ mr: 1, pt: 0.5, fontSize: "25px !important" }}
              />
            }
          >
            ورود
          </Button>
        )}
      </Box>
      {renderMenu}
    </>
  );
}

export default ToolbarMenu;
