import React from "react";

import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import Link from "../../../../src/Link";

import theme from "../../../../src/theme";

const Menu = styled.ul({
  textAlign: "center",
});

const Text = styled(Typography)({
  fontWeight: "bold",
  transition: ".1s linear all",
  borderBottom: `2px solid transparent`,
  paddingBottom: "10px",
  "&:hover": {
    paddingBottom: "8px",
    color: "red",
    borderBottom: `2px solid red`,
  },
});

const MenuItem = styled.li({
  display: "inline-block",

  padding: "5px 10px",
  margin: "0 10px",
  transition: ".1s linear all",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
});

function TopMenu() {
  return (
    <Menu>
      <MenuItem>
        <StyledLink href="#">
          <Text variant="caption">فروشگاه</Text>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink href="#">
          <Text variant="caption">درخواست همکاری</Text>
        </StyledLink>
      </MenuItem>

      <MenuItem>
        <StyledLink href="#">
          <Text variant="caption">فرم سفارش محصول</Text>
        </StyledLink>
      </MenuItem>

      <MenuItem>
        <StyledLink href="#">
          <Text variant="caption">درباره ایباکس</Text>
        </StyledLink>
      </MenuItem>

      <MenuItem>
        <StyledLink href="#">
          <Text variant="caption">تماس با ما</Text>
        </StyledLink>
      </MenuItem>
    </Menu>
  );
}

export default TopMenu;
