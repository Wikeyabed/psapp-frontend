import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SendIcon from "@mui/icons-material/Send";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import theme from "../../../src/theme";
import styled from "@emotion/styled";
import {
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Drawer,
} from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import Link from "../../../src/Link";

export default function Navbar() {
  const Icon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.lightBg,
    padding: 3,
    paddingRight: 15,
  }));

  const MenuItem = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.primary.lightBg,
    marginBottom: 1,
    padding: 1,
    "& span, & svg": {
      fontSize: "1rem",
    },
  }));

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
          width: "240px",
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
              <DashboardOutlinedIcon />
            </Icon>

            {/* menu text */}

            <MenuItem primary="داشبورد" />
          </ListItemButton>
        </Link>
        <Link href="/admin/users">
          <ListItemButton>
            <Icon>
              <PeopleAltOutlinedIcon />
            </Icon>

            <MenuItem primary="کاربران" />
          </ListItemButton>
        </Link>

        <Link href="/admin/invoices">
          <ListItemButton>
            <Icon>
              <SendIcon />
            </Icon>
            <MenuItem primary="سفارشات" />
          </ListItemButton>
        </Link>
        <ListItemButton>
          <Icon>
            <SupportAgentOutlinedIcon />
          </Icon>
          <MenuItem primary="پشتیبانی" />
        </ListItemButton>

        <Link href="/admin/products">
          <ListItemButton>
            <Icon>
              <LocalGroceryStoreOutlinedIcon />
            </Icon>
            <MenuItem primary="محصولات" />
          </ListItemButton>
        </Link>
        {/*  */}
        <ListItemButton>
          <Icon>
            <PowerSettingsNewOutlinedIcon />
          </Icon>
          <MenuItem primary="خروج" />
        </ListItemButton>
        {/*  */}
      </List>

      {/* The menu for md and xs */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        sx={{ height: "100vh", overflow: "auto" }}
      >
        <List
          sx={{
            bgcolor: theme.palette.primary.main,
            height: "100vh",
            width: "200px",
          }}
        >
          <ListItemButton>
            <Icon>
              <DashboardOutlinedIcon />
            </Icon>

            <Link href="/admin">
              <MenuItem primary="داشبورد" />
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Icon>
              <PeopleAltOutlinedIcon />
            </Icon>

            <Link href="/admin/users">
              <MenuItem primary="کاربران" />
            </Link>
          </ListItemButton>
          <ListItemButton>
            <Icon>
              <SendIcon />
            </Icon>
            <MenuItem primary="سفارشات" />
          </ListItemButton>
          <ListItemButton>
            <Icon>
              <SupportAgentOutlinedIcon />
            </Icon>
            <MenuItem primary="پشتیبانی" />
          </ListItemButton>
          <Link href="/admin/products">
            <ListItemButton>
              <Icon>
                <LocalGroceryStoreOutlinedIcon />
              </Icon>
              <MenuItem primary="محصولات" />
            </ListItemButton>
          </Link>
          <ListItemButton>
            <Icon>
              <PowerSettingsNewOutlinedIcon />
            </Icon>
            <MenuItem primary="خروج" />
          </ListItemButton>{" "}
        </List>
      </Drawer>

      {/* The toggle button for md and xs */}
      <List
        sx={{
          bgcolor: theme.palette.primary.main,
          display: { lg: "none", xl: "none" },
        }}
      >
        <ListItemButton onClick={toggleDrawer}>
          <Icon>
            <DashboardOutlinedIcon />
          </Icon>
        </ListItemButton>
      </List>
    </>
  );
}
