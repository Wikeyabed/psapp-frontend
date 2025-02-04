import * as React from "react";
import {
  Box,
  Breadcrumbs,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Link from "../../../src/Link";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SmallNavbar from "./SmallNavbar";
export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ]);
  const [open, setOpen] = React.useState(false);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  const breadcrumbs = [
    <Link
      sx={{
        color: "#fff",
      }}
      underline="none"
      key="1"
      color="lightBg"
      href="/"
    >
      داشبورد
    </Link>,
    <Link
      sx={{
        color: "#fff",
      }}
      underline="none"
      key="2"
      href="/material-ui/getting-started/installation/"
    >
      کاربران
    </Link>,
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsOpen = () => {
    setOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: 58,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        backgroundColor: "primary.main",
        position: "fixed",
        zIndex: 2,
        top: 0,
        right: 0,
        width: "100%",
      }}
    >
      <SmallNavbar open={openDrawer} toggleDrawer={toggleDrawer} />
      <Breadcrumbs
        sx={{
          fontSize: { xs: "10px", lg: "inherit" },
          paddingRight: { xs: 0, md: 4 },
        }}
        separator={
          <ArrowBackIosNewIcon
            fontSize="small"
            sx={{
              color: "primary.lightBg",
              paddingTop: 0.5,
            }}
          />
        }
        aria-label="breadcrumb"
      >
        {/* {breadcrumbs} */}
      </Breadcrumbs>

      <div>
        <Badge
          badgeContent={notifications.length}
          color="warning"
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <IconButton
            sx={{ color: "primary" }}
            onClick={handleNotificationsOpen}
          >
            <NotificationsIcon
              sx={{
                color: "#fff",
              }}
            />
          </IconButton>
        </Badge>
        <Dialog
          open={open}
          onClose={handleNotificationsClose}
          aria-labelledby="notification-dialog-title"
          aria-describedby="notification-dialog-description"
        >
          <DialogTitle id="notification-dialog-title" color="lightBg">
            Notifications
          </DialogTitle>
          <DialogContent>
            {notifications.map((notification) => (
              <DialogContentText key={notification.id} color="lightBg">
                {notification.message}
              </DialogContentText>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNotificationsClose}>Close</Button>
          </DialogActions>
        </Dialog>

        <IconButton
          size="large"
          edge="end"
          aria-label="profile"
          sx={{ mr: 1, color: "primary" }}
          onClick={handleMenuOpen}
        >
          <AccountCircleIcon
            sx={{
              color: "#fff",
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>بازگشت به سایت</MenuItem>
          <MenuItem onClick={handleMenuClose}>خروج</MenuItem>
        </Menu>
      </div>
    </Box>
  );
}
