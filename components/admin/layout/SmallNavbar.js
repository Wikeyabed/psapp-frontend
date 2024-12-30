import React from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SendIcon from "@mui/icons-material/Send";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import TextsmsIcon from "@mui/icons-material/Textsms";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Link from "next/link";
import styled from "@emotion/styled";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
const Icon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.primary.lightBg,
}));

const MenuItem = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.primary.lightBg,
  marginBottom: 1,
  padding: 1,
  "& span, & svg": {
    fontSize: "1rem",
  },
}));

function SmallNavbar({ open, toggleDrawer }) {
  return (
    <>
      {/* The menu for md and xs */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{
          height: "100vh",
          overflow: "auto",
        }}
      >
        <List
          sx={{
            bgcolor: "primary.main",
            height: "100vh",
            width: "200px",
          }}
        >
          <ListItemButton>
            <Icon>
              <DashboardOutlinedIcon />
            </Icon>

            <Link
              sx={{
                textDecoration: "none !important",
              }}
              href="/admin"
            >
              <MenuItem primary="داشبورد" />
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Icon>
              <PeopleAltOutlinedIcon />
            </Icon>

            <Link
              sx={{
                textDecoration: "none !important",
              }}
              href="/admin/users"
            >
              <MenuItem primary="کاربران" />
            </Link>
          </ListItemButton>
          <Link
            sx={{
              textDecoration: "none !important",
            }}
            href="/admin/orders"
          >
            <ListItemButton>
              <Icon>
                <SendIcon />
              </Icon>
              <MenuItem primary="سفارشات" />
            </ListItemButton>
          </Link>
          {/* <ListItemButton>
            <Icon>
              <SupportAgentOutlinedIcon />
            </Icon>
            <MenuItem primary="پشتیبانی" />
          </ListItemButton> */}
          <Link
            sx={{
              textDecoration: "none !important",
            }}
            href="/admin/products"
          >
            <ListItemButton>
              <Icon>
                <LocalGroceryStoreOutlinedIcon />
              </Icon>
              <MenuItem primary="محصولات" />
            </ListItemButton>
          </Link>
          <Link
            sx={{
              textDecoration: "none !important",
            }}
            href="/admin/requests"
          >
            <ListItemButton>
              <Icon>
                <PendingActionsIcon />
              </Icon>
              <MenuItem primary="درخواست ها" />
            </ListItemButton>
          </Link>
          <Link
            sx={{
              textDecoration: "none !important",
            }}
            href="/admin/blog"
          >
            <ListItemButton>
              <Icon>
                <HistoryEduIcon />
              </Icon>
              <MenuItem primary="بلاگ" />
            </ListItemButton>
          </Link>
          <Link
            sx={{
              textDecoration: "none !important",
            }}
            href="/admin/comments"
          >
            <ListItemButton>
              <Icon>
                <TextsmsIcon />
              </Icon>
              <MenuItem primary="نظرات" />
            </ListItemButton>
          </Link>
          <ListItemButton>
            <Icon>
              <PowerSettingsNewOutlinedIcon />
            </Icon>
            <MenuItem primary="خروج" />
          </ListItemButton>{" "}
          <Link
            sx={{
              textDecoration: "none !important",
            }}
            href="/"
          >
            <ListItemButton>
              {/* <Icon>
                <HistoryEduIcon />
              </Icon> */}
              <MenuItem primary="بازگشت به فروشگاه" />
            </ListItemButton>
          </Link>
        </List>
      </Drawer>
      {/* The toggle button for md and xs */}
      <List
        sx={{
          bgcolor: "primary.main",
          display: { lg: "none", xl: "none" },
        }}
      >
        <ListItemButton sx={{ pr: 2 }} onClick={toggleDrawer}>
          <Icon>
            <DashboardOutlinedIcon
              fontSize="small"
              sx={{ color: "primary.lightBg" }}
            />
          </Icon>
        </ListItemButton>
      </List>
    </>
  );
}

export default SmallNavbar;
