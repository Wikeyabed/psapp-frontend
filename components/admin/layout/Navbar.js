import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import MenuItem from "@mui/material/MenuItem";
import SendIcon from "@mui/icons-material/Send";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import theme from "../../../src/theme";
import styled from "@emotion/styled";
import { ListItemIcon, ListItemText } from "@mui/material";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import Link from "../../../src/Link";

export default function Navbar() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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

  return (
    <List
      sx={{
        minHeight: "150vh !important",
        bgcolor: theme.palette.primary.main,
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* Button */}
      <ListItemButton>
        {/* icon  wrapper */}
        <Icon>
          {/* icon itself */}
          <DashboardOutlinedIcon />
        </Icon>

        {/* menu text */}
        <Link href="/">
          <MenuItem primary="داشبورد" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <Icon>
          <PeopleAltOutlinedIcon />
        </Icon>
        <MenuItem primary="کاربران" />
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
      <ListItemButton>
        <Icon>
          <LocalGroceryStoreOutlinedIcon />
        </Icon>
        <MenuItem primary="محصولات" />
      </ListItemButton>
      {/*  */}
      <ListItemButton>
        <Icon>
          <PowerSettingsNewOutlinedIcon />
        </Icon>
        <MenuItem primary="خروج" />
      </ListItemButton>{" "}
      {/*  */}
    </List>
  );
}
