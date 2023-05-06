import React from "react";

import { Grid, Box , Toolbar  } from "@mui/material";
import styled from "@emotion/styled";
import Link from "../../../../src/Link";

const Menu = styled.ul({
  textAlign: "center",
});

const MenuItem = styled.li({
  display: "inline-block",
  padding:"0 20px",
  fontSize : "14px",
  textDecoration:"none"
});

const StyledLink = styled(Link) ({
    textDecoration : "none"
})

function MenuBar() {
  return (
    <Grid container>
      <Toolbar
      component={Toolbar}
        sx={{
          textAlign:"center",
          margin:"auto"
        }}
        item
        md={12}
      >
        <Menu>
          <MenuItem>
            <StyledLink href="#">کارتن پستی</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink href="#">کارتن استوک</StyledLink>
          </MenuItem>

          <MenuItem>
            <StyledLink href="#">کارتن ماسک</StyledLink>
          </MenuItem>

          <MenuItem>
            <StyledLink href="#">لوازم اسباب کشی</StyledLink>
          </MenuItem>

        </Menu>
      </Toolbar>
    </Grid>
  );
}

export default MenuBar;
