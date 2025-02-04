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
    // padding: 2,
    // paddingRight: 10,
    minWidth: 20,
  }));

  const MenuItem = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.primary.lightBg,
    marginBottom: 1,
    padding: 1,
    "& span, & svg": {
      fontSize: ".7rem",
    },
  }));
  return (
    <>
      {/* The menu for lg and xl */}
      <List
        sx={{
          bgcolor: "primary.main",
          display: { xs: "none", md: "none", lg: "block", xl: "block" },
          position: "fixed",
          top: 0,
          right: 0,
          width: { md: "calc(100% / 6)", xl: "calc(100% / 7.6)" }, // change fixed value to dynamic value
          height: "100vh",
        }}
      >
        <Typography
          sx={{
            color: theme.palette.primary.lightBg,
            textAlign: "center",
            py: 1,
          }}
          variant="h4"
        >
          ایـبـاکس
        </Typography>
        <Divider
          sx={{
            my: 2,
            backgroundColor: theme.palette.primary.lightBg,
            width: "75%",
            mx: "auto",
            height: "2px",
          }}
        />
        {/* Button */}
        <Link href="/admin">
          <ListItemButton>
            {/* icon  wrapper */}
            <Icon>
              {/* icon itself */}
              <DashboardOutlinedIcon fontSize="12px" />
            </Icon>

            {/* menu text */}

            <MenuItem primary="داشبورد" />
          </ListItemButton>
        </Link>
        <Link href="/admin/users">
          <ListItemButton>
            <Icon>
              <PeopleAltOutlinedIcon fontSize="12px" />
            </Icon>

            <MenuItem primary="کاربران" />
          </ListItemButton>
        </Link>

        <Link href="/admin/orders">
          <ListItemButton>
            <Icon>
              <SendIcon fontSize="12px" />
            </Icon>
            <MenuItem primary="سفارشات" />
          </ListItemButton>
        </Link>
        <ListItemButton>
          <Icon>
            <SupportAgentOutlinedIcon fontSize="12px" />
          </Icon>
          <MenuItem primary="پشتیبانی" />
        </ListItemButton>

        <Link href="/admin/products">
          <ListItemButton>
            <Icon>
              <LocalGroceryStoreOutlinedIcon fontSize="12px" />
            </Icon>
            <MenuItem primary="محصولات" />
          </ListItemButton>
        </Link>

        <Link href="/admin/requests">
          <ListItemButton>
            <Icon>
              <PendingActionsIcon fontSize="12px" />
            </Icon>
            <MenuItem primary="درخواست ها" />
          </ListItemButton>
        </Link>

        <Link href="/admin/blog">
          <ListItemButton>
            <Icon>
              <HistoryEduIcon fontSize="12px" />
            </Icon>
            <MenuItem primary="بلاگ" />
          </ListItemButton>
        </Link>

        <Link href="/admin/comments">
          <ListItemButton>
            <Icon>
              <CommentIcon fontSize="12px" />
            </Icon>
            <MenuItem primary="نظرات" />
          </ListItemButton>
        </Link>

        <Link href="/admin/blog">
          <ListItemButton>
            <Icon>
              <NotificationsActiveIcon fontSize="12px" />
            </Icon>
            <MenuItem primary="اعلانات" />
          </ListItemButton>
        </Link>

        <Link href="/">
          <ListItemButton>
            <Icon>
              <KeyboardReturnIcon fontSize="12px" />
            </Icon>

            <MenuItem primary="بازگشت به فروشگاه" />
          </ListItemButton>
        </Link>

        {/*  */}
        <ListItemButton>
          <Icon>
            <PowerSettingsNewOutlinedIcon fontSize="12px" />
          </Icon>
          <MenuItem primary="خروج" />
        </ListItemButton>
        {/*  */}
      </List>
    </>
  );
}
