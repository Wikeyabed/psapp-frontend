import { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import {
  DashboardOutlined as DashboardIcon,
  PeopleAltOutlined as UsersIcon,
  Send as OrdersIcon,
  SupportAgentOutlined as SupportIcon,
  LocalGroceryStoreOutlined as ProductsIcon,
  PendingActions as RequestsIcon,
  HistoryEdu as BlogIcon,
  Comment as CommentsIcon,
  NotificationsActive as NotificationsIcon,
  KeyboardReturn as ReturnIcon,
  PowerSettingsNewOutlined as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "../../../src/Link";
import theme from "../../../src/theme";
import styled from "@emotion/styled";




const NavbarContainer = styled(List)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: "100vh",
  padding: "16px 0",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: "3px",
  },
}));

const MobileNavbarContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px",
  backgroundColor: theme.palette.primary.main,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  boxShadow: theme.shadows[4],
}));

const NavLogo = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  padding: "24px 0",
  fontSize: "1.75rem",
  fontWeight: 700,
  letterSpacing: "0.5px",
}));

const NavDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  margin: "8px 24px",
}));

const NavIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  minWidth: "36px",
  transition: "all 0.2s ease",
}));

const NavItemText = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  "& span": {
    fontSize: "0.875rem",
    fontWeight: 500,
  },
}));

const NavItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: "12px 24px",
  margin: "4px 16px",
  borderRadius: "8px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    "& .MuiListItemIcon-root": {
      transform: "scale(1.1)",
    },
  },
  "&.Mui-selected": {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
}));

const navItems = [
  { href: "/admin", icon: <DashboardIcon fontSize="small" />, text: "داشبورد" },
  {
    href: "/admin/users",
    icon: <UsersIcon fontSize="small" />,
    text: "کاربران",
  },
  {
    href: "/admin/orders",
    icon: <OrdersIcon fontSize="small" />,
    text: "سفارشات",
  },
  {
    href: "/admin/support",
    icon: <SupportIcon fontSize="small" />,
    text: "پشتیبانی",
  },
  {
    href: "/admin/products",
    icon: <ProductsIcon fontSize="small" />,
    text: "محصولات",
  },
  {
    href: "/admin/requests",
    icon: <RequestsIcon fontSize="small" />,
    text: "درخواست ها",
  },
  { href: "/admin/blog", icon: <BlogIcon fontSize="small" />, text: "بلاگ" },
  {
    href: "/admin/comments",
    icon: <CommentsIcon fontSize="small" />,
    text: "نظرات",
  },
  {
    href: "/admin/notifications",
    icon: <NotificationsIcon fontSize="small" />,
    text: "اعلانات",
  },
];

const bottomNavItems = [
  {
    href: "/",
    icon: <ReturnIcon fontSize="small" />,
    text: "بازگشت به فروشگاه",
  },
  {
    href: "#",
    icon: <LogoutIcon fontSize="small" />,
    text: "خروج",
    onClick: () => console.log("Logout clicked"),
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
      <NavLogo variant="h4">ایـبـاکس</NavLogo>
      <NavDivider />

      {navItems.map((item) => (
        <Link href={item.href} key={item.text} passHref>
          <NavItemButton>
            <NavIcon>{item.icon}</NavIcon>
            <NavItemText primary={item.text} />
          </NavItemButton>
        </Link>
      ))}

      <NavDivider />

      {bottomNavItems.map((item) => (
        <Link href={item.href} key={item.text} passHref>
          <NavItemButton onClick={item.onClick}>
            <NavIcon>{item.icon}</NavIcon>
            <NavItemText primary={item.text} />
          </NavItemButton>
        </Link>
      ))}
    </>
  );

  return (
    <>
      {isMobile ? (
        <>
          <MobileNavbarContainer>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: "primary.contrastText" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: "primary.contrastText" }}>
              ایـبـاکس
            </Typography>
            <Box sx={{ width: 48 }} /> {/* Spacer for alignment */}
          </MobileNavbarContainer>

          <SwipeableDrawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={handleDrawerToggle}
            sx={{
              "& .MuiDrawer-paper": {
                width: 280,
                boxSizing: "border-box",
                backgroundColor: "primary.main",
              },
            }}
          >
            <NavbarContainer>{renderNavItems()}</NavbarContainer>
          </SwipeableDrawer>
        </>
      ) : (
        <NavbarContainer
          sx={{
            display: { xs: "none", md: "none", lg: "block", xl: "block" },
            position: "fixed",
            top: 0,
            right: 0,
            width: { md: "280px", xl: "320px" },
          }}
        >
          {renderNavItems()}
        </NavbarContainer>
      )}
    </>
  );
}
