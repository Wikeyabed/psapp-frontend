import React from "react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

function ToolbarIcons() {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
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
      <MenuItem onClick={handleMenuClose}>پروفایل</MenuItem>
      <MenuItem onClick={handleMenuClose}>خروج</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {/* <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="primary"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <IconButton
          size="large"
          edge="start"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="info"
        >
          <AccountCircleIcon />
          <Typography sx={{ mr: 1, color: "#e0e0e0", fontSize: "13px" }}>
            {" "}
            ممد یوسفی
          </Typography>
        </IconButton>
      </Box>
      {renderMenu}
    </>
  );
}

export default ToolbarIcons;
