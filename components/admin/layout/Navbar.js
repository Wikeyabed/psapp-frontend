import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SendIcon from "@mui/icons-material/Send";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import theme from "../../../src/theme";
import styled from "@emotion/styled";
import { ListItemIcon, ListItemText, Divider, Typography } from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CommentIcon from "@mui/icons-material/Comment";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Link from "../../../src/Link";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

export default function Navbar() {
  const Icon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.lightBg,
    minWidth: 36,
    transition: "all 0.2s ease",
  }));

  const MenuItem = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.primary.lightBg,
    margin: 0,
    "& span": {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  }));

  const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    padding: "12px 24px",
    margin: "4px 12px",
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

  return (
    <List
      sx={{
        bgcolor: "primary.main",
        display: { xs: "none", md: "none", lg: "block", xl: "block" },
        position: "fixed",
        top: 0,
        right: 0,
        width: { md: "calc(100% / 6)", xl: "calc(100% / 7.6)" },
        height: "100vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "2px",
        },
      }}
    >
      <Typography
        sx={{
          color: theme.palette.primary.lightBg,
          textAlign: "center",
          py: 3,
          fontSize: "1.75rem",
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
        variant="h4"
      >
        ایـبـاکس
      </Typography>
      <Divider
        sx={{
          my: 1,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          width: "80%",
          mx: "auto",
        }}
      />

      <Link href="/admin">
        <StyledListItemButton>
          <Icon>
            <DashboardOutlinedIcon fontSize="small" />
          </Icon>
          <MenuItem primary="داشبورد" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/users">
        <StyledListItemButton>
          <Icon>
            <PeopleAltOutlinedIcon fontSize="small" />
          </Icon>
          <MenuItem primary="کاربران" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/orders">
        <StyledListItemButton>
          <Icon>
            <SendIcon fontSize="small" />
          </Icon>
          <MenuItem primary="سفارشات" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/support">
        <StyledListItemButton>
          <Icon>
            <SupportAgentOutlinedIcon fontSize="small" />
          </Icon>
          <MenuItem primary="پشتیبانی" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/products">
        <StyledListItemButton>
          <Icon>
            <LocalGroceryStoreOutlinedIcon fontSize="small" />
          </Icon>
          <MenuItem primary="محصولات" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/requests">
        <StyledListItemButton>
          <Icon>
            <PendingActionsIcon fontSize="small" />
          </Icon>
          <MenuItem primary="درخواست ها" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/blog">
        <StyledListItemButton>
          <Icon>
            <HistoryEduIcon fontSize="small" />
          </Icon>
          <MenuItem primary="بلاگ" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/comments">
        <StyledListItemButton>
          <Icon>
            <CommentIcon fontSize="small" />
          </Icon>
          <MenuItem primary="نظرات" />
        </StyledListItemButton>
      </Link>

      <Link href="/admin/notifications">
        <StyledListItemButton>
          <Icon>
            <NotificationsActiveIcon fontSize="small" />
          </Icon>
          <MenuItem primary="اعلانات" />
        </StyledListItemButton>
      </Link>

      <Divider
        sx={{
          my: 1,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          width: "80%",
          mx: "auto",
        }}
      />

      <Link href="/">
        <StyledListItemButton>
          <Icon>
            <KeyboardReturnIcon fontSize="small" />
          </Icon>
          <MenuItem primary="بازگشت به فروشگاه" />
        </StyledListItemButton>
      </Link>

      <StyledListItemButton>
        <Icon>
          <PowerSettingsNewOutlinedIcon fontSize="small" />
        </Icon>
        <MenuItem primary="خروج" />
      </StyledListItemButton>
    </List>
  );
}
