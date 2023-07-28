import { Grid, Box, Paper, TextField, MenuItem } from "@mui/material";
import styled from "@emotion/styled";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchBar from "../../layout/navbar/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setFilter,
  setPriceSort,
} from "../../../../redux/reducers/productSlice";

// Styled component for the text field with right-to-left direction and custom styles
const RtlTextField = styled(TextField)(({ theme }) => ({
  minWidth: "100%",
  direction: "rtl",
  paddingLeft: "5px",
  borderRadius: "10px !important",
  "& fieldset": {
    borderRadius: "10px",
    borderColor: "#e0e0e0",
  },

  textAlign: "center !important",

  transform: "scale(.9)",
  "& label": {
    transformOrigin: "right !important",
    textAlign: "right !important",
    left: "inherit !important",
    right: "2rem !important",
    overflow: "unset",
    top: 0,
    // fontSize: "15px",
  },
}));
// Styled component for the select icon with custom styles
const SelectIcon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
  position: "absolute",
  right: "85% !important",
  // backgroundColor : theme.palette.primary.main.
}));

// Main component for the filter bar
function FilterBar() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);
  const priceSort = useSelector((state) => state.product.priceSort);
  const categories = productList.map((product) => {
    return product.category;
  });
  let uniqueCategories = [...new Set(categories)];

  // filter the selected categories
  const handleChangeCategory = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handlePriceSort = (e) => {
    dispatch(setPriceSort(e.target.value));
  };

  return (
    <Grid
      container
      sx={{
        paddingTop: "5px",
        marginTop: "5px",
        marginBottom: "30px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "15px",
      }}
    >
      {/* Empty grid item */}
      {/* Grid item for product category select field */}
      <Grid
        sx={{
          pt: 1,
          textAlign: "center",
        }}
        item
        xs={12}
        lg={3}
      >
        <RtlTextField
          onChange={handleChangeCategory}
          color="warning"
          size="small"
          defaultValue={"all"}
          SelectProps={{
            IconComponent: SelectIcon,
            style: {
              padding: "6px 2px 3px 5px",
              boxShadow: "0px 4px 0px 0px #e0e0e0",
              borderRadius: "10px",
            },
          }}
          select
          label="دسته بندی محصول"
        >
          <MenuItem value="all">تمام دسته بندی ها</MenuItem>
          {uniqueCategories.map((category, i) => {
            return (
              <MenuItem key={i} value={category}>
                {category}
              </MenuItem>
            );
          })}
        </RtlTextField>
      </Grid>
      {/* Empty grid item */}
      {/* Grid item for sorting select field */}
      <Grid
        xs={12}
        sx={{
          pt: 1,
          textAlign: "center",
        }}
        item
        lg={3}
      >
        <RtlTextField
          color="warning"
          size="small"
          value={priceSort}
          onChange={handlePriceSort}
          SelectProps={{
            IconComponent: SelectIcon,
            style: {
              padding: "6px 2px 3px 5px",
              boxShadow: "0px 4px 0px 0px #e0e0e0",
              borderRadius: "10px",
            },
          }}
          select
          fullWidth
          label="مرتب سازی بر اساس"
        >
          {/* <MenuItem value={"1"}>پربازدید ترین</MenuItem> */}
          <MenuItem value={"cheap"}>ارزانترین</MenuItem>
          <MenuItem value={"expensive"}>گرانترین</MenuItem>
        </RtlTextField>
      </Grid>
      <Grid item lg={1.7}></Grid>

      <Grid
        xs={12}
        lg={4}
        sx={{
          pt: 1,
          textAlign: "center",
          mt: { xs: 4, lg: 0 },
        }}
        item
      >
        <SearchBar />
      </Grid>
    </Grid>
  );
}
export default FilterBar;
