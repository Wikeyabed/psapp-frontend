import * as React from "react";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  border: `2px solid ${theme.palette.primary.main}`,
  boxShadow: `0px 0px 2px 2px${theme.palette.primary.lightBg} `,
  borderRadius: "10px !important",
  backgroundColor: "#fff",
  "&:hover": {
    backgroundColor: "#e2e2e2",
  },
  marginRight: theme.spacing(2),
  marginLeft: "5rem !important",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  left: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SearchBar() {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="جستجو ..."
        inputProps={{ "aria-label": "جستجو" }}
      />
    </Search>
  );
}

export default SearchBar;
