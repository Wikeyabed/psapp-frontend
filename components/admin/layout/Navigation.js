import * as React from "react";
import {
  Box,
  Stack,
  Link,
  Typography,
  Breadcrumbs,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const breadcrumbs = [
    <Link underline="none" key="1" color="primary" href="/">
      داشبورد
    </Link>,
    <Link
      underline="none"
      key="2"
      color="primary"
      href="/material-ui/getting-started/installation/"
    >
      کاربران
    </Link>,
    <Typography key="3" color="text.primary">
      ممد یوسفی
    </Typography>,
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minHeight: 48, // made the navigation bar smaller
        py: 1, // made the padding smaller
        px: 2, // made the padding smaller
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "space-between", // aligned user icon to right
        alignItems: "center",
        color: "primary.contrastText",
        boxShadow: "0px 2px 2px rgba(0,0,0,0.1)", // added shadow
      }}
    >
      <Breadcrumbs sx={{ color: "#5f5f5f" }} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>

      <div>
        <Badge
          badgeContent={4}
          color="error"
          overlap="circle"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <IconButton color="primary">
            <NotificationsIcon />
          </IconButton>
        </Badge>
        <IconButton
          size="large"
          edge="end"
          color="primary" // changed icon color to blue
          aria-label="profile"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Account settings</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  );
}
