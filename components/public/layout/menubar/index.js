import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Inventory as InventoryIcon,
  Inbox as InboxIcon,
  AllInbox as AllInboxIcon,
  LocalShipping as LocalShippingIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Link from "../../../../src/Link";
import styled from "@emotion/styled";
import theme from "../../../../src/theme";

const StyledLink = styled(Link)({
  textDecoration: "none",
  textAlign: "center !important",
});
function MenuBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const menuItems = [
    {
      label: "کارتن پستی",
      icon: <InventoryIcon />,
      url: "#",
    },
    {
      label: "کارتن استوک",
      icon: <InboxIcon />,
      url: "#",
    },
    {
      label: "کارتن ماسک",
      icon: <AllInboxIcon />,
      url: "#",
    },
    {
      label: "لوازم اسباب کشی",
      icon: <LocalShippingIcon />,
      url: "#",
    },
  ];
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { xs: "block", md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <List>
          {menuItems.map((menuItem, index) => (
            <ListItem
              key={index}
              component={StyledLink}
              href={menuItem.url}
              sx={{
                textAlign: "center",
                "&:hover": {
                  backgroundColor: theme.palette.primary.lightDarker,
                },
              }}
            >
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <List
        sx={{
          marginX: "auto",
          width: { md: "100%", lg: "70%" },
          display: { xs: "none", md: "flex" },
        }}
      >
        {menuItems.map((menuItem, index) => (
          <ListItem
            key={index}
            component={StyledLink}
            href={menuItem.url}
            sx={{
              textAlign: "center",
              "&:hover": {
                backgroundColor: theme.palette.primary.lightDarker,
              },
            }}
          >
            <ListItemIcon>{menuItem.icon}</ListItemIcon>
            <ListItemText primary={menuItem.label} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
export default MenuBar;
