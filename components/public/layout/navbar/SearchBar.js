import * as React from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { searchValue } from "../../../../redux/reducers/productSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: `1px solid #e0e0e0`,
  borderRadius: "10px !important",
  paddingRight: "5px",
  lineHeight: "45px !important",
  transform: "scale(.9)",
  boxShadow: "0px 4px 0px 0px #e2e2e2",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#efefef",
  },
  margin: "0 auto !important",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
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
  const dispatch = useDispatch();

  const handleProductSearch = (e) => {
    dispatch(searchValue(e.target.value));
  };
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleProductSearch}
        placeholder="جستجو ..."
        inputProps={{ "aria-label": "جستجو" }}
      />
    </Search>
  );
}

export default SearchBar;
