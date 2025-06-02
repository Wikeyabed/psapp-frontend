import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  Send,
  LocalGroceryStoreOutlined,
  PowerSettingsNew,
  Textsms,
  HistoryEdu,
  PendingActions,
  Store,
} from "@mui/icons-material";
import Link from "next/link";
import styled from "@emotion/styled";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 250,
    backgroundColor: "#6366f1",
    color: "white",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    boxShadow: "4px 0 15px rgba(0, 0, 0, 0.1)",
  },
}));

const MenuIcon = styled(ListItemIcon)({
  minWidth: 40,
  color: "inherit",
});

const MenuItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontWeight: 500,
    fontSize: "0.875rem",
  },
});

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 8,
  margin: "4px 8px",
  padding: "10px 12px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  "&.Mui-selected": {
    backgroundColor: "#06b6d4",
  },
}));

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
  marginBottom: 8,
});

function SmallNavbar({ open, toggleDrawer }) {
  const theme = useTheme();

  const menuItems = [
    { icon: <DashboardOutlined />, text: "داشبورد", href: "/admin" },
    { icon: <PeopleAltOutlined />, text: "کاربران", href: "/admin/users" },
    { icon: <Send />, text: "سفارشات", href: "/admin/orders" },
    { icon: <LocalGroceryStoreOutlined />, text: "محصولات", href: "/admin/products" },
    { icon: <PendingActions />, text: "درخواست ها", href: "/admin/requests" },
    { icon: <HistoryEdu />, text: "بلاگ", href: "/admin/blog" },
    { icon: <Textsms />, text: "نظرات", href: "/admin/comments" },
  ];

  const bottomItems = [
    { icon: <Store />, text: "بازگشت به فروشگاه", href: "/" },
    { icon: <PowerSettingsNew />, text: "خروج", href: "/logout" },
  ];

  return (
    <>
      <StyledDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        variant="temporary"
      >
        <LogoContainer>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            پنل مدیریت
          </Typography>
        </LogoContainer>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 1 }} />

        <List>
          {menuItems.map((item, index) => (
            <Link href={item.href} passHref key={index} legacyBehavior>
              <StyledListItemButton component="a">
                <MenuIcon>{item.icon}</MenuIcon>
                <MenuItemText primary={item.text} />
              </StyledListItemButton>
            </Link>
          ))}
        </List>

        <Box sx={{ mt: "auto" }}>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 1 }} />
          <List>
            {bottomItems.map((item, index) => (
              <Link href={item.href} passHref key={index} legacyBehavior>
                <StyledListItemButton component="a">
                  <MenuIcon>{item.icon}</MenuIcon>
                  <MenuItemText primary={item.text} />
                </StyledListItemButton>
              </Link>
            ))}
          </List>
        </Box>
      </StyledDrawer>

      {/* Toggle Button */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 1200,
          display: { lg: "none" },
        }}
      >
        <StyledListItemButton
          onClick={toggleDrawer}
          sx={{
            backgroundColor: "#6366f1",
            color: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <MenuIcon>
            <DashboardOutlined />
          </MenuIcon>
        </StyledListItemButton>
      </Box>
    </>
  );
}

export default SmallNavbar;