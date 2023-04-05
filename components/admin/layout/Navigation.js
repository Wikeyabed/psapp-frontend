import * as React from "react";
import {
  Box,
  Link,
  Typography,
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
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavigationBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ]);
  const [open, setOpen] = React.useState(false);
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
        minHeight: 48,
        py: 1,
        px: { xs: 2, md: 5 },
        bgcolor: "primary.lightDarker",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: 2, // added shadow
      }}
    >
      <Breadcrumbs sx={{ color: "#5f5f5f" }} aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>

      <div>
        <Badge
          badgeContent={notifications.length}
          color="warning"
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <IconButton color="primary" onClick={handleNotificationsOpen}>
            <NotificationsIcon />
          </IconButton>
        </Badge>
        <Dialog
          open={open}
          onClose={handleNotificationsClose}
          aria-labelledby="notification-dialog-title"
          aria-describedby="notification-dialog-description"
        >
          <DialogTitle id="notification-dialog-title">
            Notifications
          </DialogTitle>
          <DialogContent>
            {notifications.map((notification) => (
              <DialogContentText key={notification.id}>
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
          color="primary"
          aria-label="profile"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <AccountCircleIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </div>
    </Box>
  );
}
