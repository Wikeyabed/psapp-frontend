import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  styled,
  Fade,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  PersonOutline as UserIcon,
  Login as LoginIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import Link from "../../../../src/Link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { userLogout } from "../../../../redux/reducers/authSlice";
import { deleteCookie } from "cookies-next";

// ====== Styled Components ======
const AuthButton = styled(Button)({
  minWidth: 120,
  height: 40,
  borderRadius: 12,
  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
  color: "white",
  boxShadow: "0 2px 12px rgba(99, 102, 241, 0.3)",
  textTransform: "none",
  fontSize: 14,
  fontWeight: 500,
  padding: "8px 16px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.4)",
    background: "linear-gradient(135deg, #5659e0, #05a5c1)",
  },
});

const UserMenuButton = styled(Box)({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  padding: "6px 12px",
  borderRadius: 8,
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
});

const UserNameText = styled(Typography)({
  color: "#f8fafc",
  fontSize: 14,
  fontWeight: 500,
  marginRight: 8,
  maxWidth: 120,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    borderRadius: 12,
    minWidth: 180,
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.12)",
    marginTop: 8,
    "& .MuiMenuItem-root": {
      fontSize: 14,
      padding: "10px 16px",
      "&:hover": {
        backgroundColor: "#f8fafc",
      },
    },
  },
});

const AdminMenuItem = styled(MenuItem)({
  color: "#ef4444 !important",
  fontWeight: "500 !important",
  borderTop: "1px solid #e5e7eb",
  marginTop: 4,
  paddingTop: "12px !important",
});

// ====== Main Component ======
function ToolbarMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const isAdminLoggedIn = user.isLoggedIn && user.userInformation?.r === "1";
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

  const renderMenu = (
    <StyledMenu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      disableScrollLock
    >
      <MenuItem component={Link} href="/user" onClick={handleMenuClose}>
        <UserIcon fontSize="small" sx={{ marginLeft: 1 }} />
        پروفایل کاربری
      </MenuItem>
      <MenuItem onClick={handleUserLogout}>
        <LoginIcon
          fontSize="small"
          sx={{ marginLeft: 1, transform: "rotate(180deg)" }}
        />
        خروج
      </MenuItem>

      {isAdminLoggedIn && (
        <AdminMenuItem component={Link} href="/admin" onClick={handleMenuClose}>
          <Box component="span" sx={{ marginLeft: 1 }}>
            ⚙️
          </Box>
          پنل مدیریت
        </AdminMenuItem>
      )}
    </StyledMenu>
  );

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
      {user.isLoggedIn ? (
        <UserMenuButton onClick={handleProfileMenuOpen}>
          <UserIcon sx={{ color: "#e2e8f0", fontSize: 35 }} />
          <UserNameText>
            {user.userInformation?.firstName} {user.userInformation?.lastName}
          </UserNameText>
          <ArrowDropDownIcon sx={{ color: "#e2e8f0", fontSize: 50 }} />
        </UserMenuButton>
      ) : (
        <AuthButton
          component={Link}
          href="/auth/login"
          endIcon={<LoginIcon sx={{ fontSize: 18 }} />}
        >
          ورود
        </AuthButton>
      )}
      {renderMenu}
    </Box>
  );
}

export default ToolbarMenu;
