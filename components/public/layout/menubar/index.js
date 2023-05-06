import React from "react";

import { Grid, Box, Toolbar, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Link from "../../../../src/Link";

import InventoryIcon from "@mui/icons-material/Inventory";
import InboxIcon from "@mui/icons-material/Inbox";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import theme from "../../../../src/theme";

const Menu = styled.ul({
  textAlign: "center",
});

const Icon = styled.span({
  padding: "1px 5px !important",
  display: "flex",
  float: "right",
  alignItems: "center",
});

const MenuItem = styled.li({
  display: "inline-block",
  padding: "8px 16px",
  margin: "0 10px",
  borderRadius: "5px",
  transition: ".01s linear all",
  borderRight: `3px solid transparent`,
  borderLeft: `3px solid transparent`,

  "&:hover": {
    backgroundColor: theme.palette.primary.lightDarker,
    borderRight: `3px solid ${theme.palette.primary.main}`,
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  },
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});

function MenuBar() {
  return (
    <Grid container>
      <Toolbar
        component={Toolbar}
        sx={{
          textAlign: "center",
          margin: "auto",
        }}
        item
        md={12}
      >
        <Menu>
          <MenuItem>
            <StyledLink href="#">
              <Typography variant="button">
                <Icon>
                  <InventoryIcon fontSize={"small"} />
                </Icon>
                کارتن پستی
              </Typography>
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink href="#">
              <Typography variant="button">
                <Icon>
                  <InboxIcon fontSize={"small"} />
                </Icon>
                کارتن استوک
              </Typography>
            </StyledLink>
          </MenuItem>

          <MenuItem>
            <StyledLink href="#">
              <Typography variant="button">
                <Icon>
                  <AllInboxIcon fontSize={"small"} />
                </Icon>
                کارتن ماسک
              </Typography>
            </StyledLink>
          </MenuItem>

          <MenuItem>
            <StyledLink href="#">
              <Typography variant="button">
                <Icon>
                  <LocalShippingIcon fontSize={"small"} />
                </Icon>
                لوازم اسباب کشی
              </Typography>
            </StyledLink>
          </MenuItem>
        </Menu>
      </Toolbar>
    </Grid>
  );
}

export default MenuBar;
