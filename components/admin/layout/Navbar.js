import { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  SwipeableDrawer,
  Avatar,
  Badge,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  PeopleAlt as UsersIcon,
  LocalShipping as OrdersIcon,
  SupportAgent as SupportIcon,
  ShoppingBag as ProductsIcon,
  PendingActions as RequestsIcon,
  Article as BlogIcon,
  ChatBubble as CommentsIcon,
  Notifications as NotificationsIcon,
  Store as ReturnIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "../../../src/Link";
import styled from "@emotion/styled";

// رنگ‌های اصلی بر اساس پالت درخواستی
const primaryColor = "#6366f1";
const secondaryColor = "#06b6d4";
const bgColor = "#f8fafc";
const textColor = "#1e293b";

// استایل‌های سفارشی
const StyledSwipeableDrawer = styled(SwipeableDrawer)({
  "& .MuiDrawer-paper": {
    width: 280,
    borderLeft: `2px solid ${secondaryColor}`,
    background: `linear-gradient(135deg, ${primaryColor} 0%, #818cf8 100%)`,
    boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.1)",
  },
});

const NavbarContainer = styled(List)({
  height: "100vh",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  background: `linear-gradient(180deg, ${primaryColor} 0%, #818cf8 100%)`,
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(255, 255, 255, 0.4)",
    borderRadius: "3px",
  },
});

const MobileHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  background: primaryColor,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
});

const NavLogo = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "32px 16px 24px",
  color: "white",
});

const LogoText = styled(Typography)({
  fontWeight: 700,
  fontSize: "1.5rem",
  marginTop: "8px",
  letterSpacing: "0.5px",
});

const NavDivider = styled(Divider)({
  borderColor: "rgba(255, 255, 255, 0.2)",
  margin: "8px 24px",
});

const NavItemButton = styled(ListItemButton)({
  padding: "12px 24px",
  margin: "4px 16px",
  borderRadius: "12px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  color: "white",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.15)",
    transform: "translateX(-4px)",
  },
  "&.Mui-selected": {
    background: secondaryColor,
    "&:hover": {
      background: "#0dd1f2",
    },
  },
});

const NavIcon = styled(ListItemIcon)({
  minWidth: "40px",
  color: "inherit",
  "& svg": {
    fontSize: "1.25rem",
  },
});

const NavItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontWeight: 500,
    fontSize: "0.95rem",
  },
});

const NotificationBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    right: -8,
    top: 8,
    background: "#ef4444",
    color: "white",
  },
});

const navItems = [
  { href: "/admin", icon: <DashboardIcon />, text: "داشبورد" },
  { href: "/admin/users", icon: <UsersIcon />, text: "کاربران" },
  { href: "/admin/orders", icon: <OrdersIcon />, text: "سفارشات" },
  { href: "/admin/support", icon: <SupportIcon />, text: "پشتیبانی" },
  { href: "/admin/products", icon: <ProductsIcon />, text: "محصولات" },
  { href: "/admin/requests", icon: <RequestsIcon />, text: "درخواست ها" },
  { href: "/admin/blog", icon: <BlogIcon />, text: "بلاگ" },
  { href: "/admin/comments", icon: <CommentsIcon />, text: "نظرات" },
  { 
    href: "/admin/notifications", 
    icon: (
      <NotificationBadge badgeContent={5} color="error">
        <NotificationsIcon />
      </NotificationBadge>
    ), 
    text: "اعلانات" 
  },
];

const bottomNavItems = [
  { href: "/", icon: <ReturnIcon />, text: "بازگشت به فروشگاه" },
  { 
    href: "#", 
    icon: <LogoutIcon />, 
    text: "خروج", 
    onClick: (e) => {
      e.preventDefault();
      console.log("Logout clicked");
    } 
  },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderNavItems = () => (
    <>
      <NavLogo>
        <Avatar 
          src="/logo.png" 
          alt="Logo" 
          sx={{ 
            width: 56, 
            height: 56, 
            bgcolor: secondaryColor,
            mb: 1
          }} 
        />
        <LogoText variant="h4">پنل مدیریت</LogoText>
      </NavLogo>

      <NavDivider />

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {navItems.map((item) => (
          <Link href={item.href} key={item.text} passHref legacyBehavior>
            <NavItemButton component="a">
              <NavIcon>{item.icon}</NavIcon>
              <NavItemText primary={item.text} />
            </NavItemButton>
          </Link>
        ))}
      </Box>

      <NavDivider />

      <Box sx={{ pb: 2 }}>
        {bottomNavItems.map((item) => (
          <Link 
            href={item.href} 
            key={item.text} 
            passHref 
            legacyBehavior
            onClick={item.onClick}
          >
            <NavItemButton component="a">
              <NavIcon>{item.icon}</NavIcon>
              <NavItemText primary={item.text} />
            </NavItemButton>
          </Link>
        ))}
      </Box>
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          <MobileHeader>
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ color: "white" }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
              پنل مدیریت
            </Typography>
            <Box sx={{ width: 48 }} />
          </MobileHeader>

          <StyledSwipeableDrawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
          >
            <NavbarContainer>{renderNavItems()}</NavbarContainer>
          </StyledSwipeableDrawer>
        </>
      ) : (
        <NavbarContainer
          sx={{
            display: { xs: "none", md: "flex" },
            width: 280,
            position: "fixed",
            top: 0,
            right: 0,
            borderLeft: `2px solid ${secondaryColor}`,
          }}
        >
          {renderNavItems()}
        </NavbarContainer>
      )}
    </>
  );
}