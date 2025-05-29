import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
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
      disableScrollLock={true}
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
              <AccountCircleIcon
                sx={{
                  color: "secondary.main",
                }}
              />
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
            variant="contained"
            sx={{
              fontSize: "1rem",
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: "transparent",
              backgroundImage: "linear-gradient(135deg, #6366f1, #06b6d4)",
              color: "white",
              marginRight: "8px",
              // سایه اصلی با رنگ بنفش-آبی
              boxShadow:
                "0 4px 15px rgba(99, 102, 241, 0.5), 0 2px 4px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              minWidth: "120px",
              minHeight: "48px",
              transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-3px)",
                // سایه هنگام hover با شدت بیشتر
                boxShadow:
                  "0 8px 25px rgba(99, 102, 241, 0.6), 0 4px 8px rgba(0, 0, 0, 0.15)",
                backgroundColor: "transparent",
                backgroundImage: "linear-gradient(135deg, #6366f1, #06b6d4)",
                "&:before": {
                  opacity: 1,
                },
              },
              "&:before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0))",
                opacity: 0,
                transition: "opacity 0.3s ease",
              },
              "& .MuiButton-endIcon": {
                marginRight: "8px",
                marginLeft: "0",
                transition: "transform 0.3s ease",
              },
              "&:hover .MuiButton-endIcon": {
                transform: "translateX(3px)",
              },
            }}
            endIcon={
              <LoginIcon
                sx={{
                  color: "white",
                  fontSize: "25px !important",
                }}
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
