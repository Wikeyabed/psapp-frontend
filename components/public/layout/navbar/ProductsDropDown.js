import { Box, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import Link from "../../../../src/Link";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../../redux/reducers/productSlice";

function ProductsDropDown({ handleNavigate }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);
  const categories = productList.map((product) => {
    return product.category;
  });
  let uniqueCategories = [...new Set(categories)];

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleChangeCategory = (category) => {
    dispatch(setFilter(category));
    console.log(category);
  };

  return (
    <>
      {uniqueCategories.map((category) => {
        return (
          <MenuItem
            component={Link}
            href={`/shop/categories?${createQueryString("category", category)}`}
            key={category}
            sx={{
              pr: 0,
              py: 1.5,
            }}
            onClick={() => {
              handleNavigate();
              handleChangeCategory(category);
            }}
            disableRipple
          >
            <ChevronLeftIcon fontSize="small" sx={{ ml: 0.5 }} />
            <Typography fontWeight={"bold"} variant="body2">
              {category}
            </Typography>
          </MenuItem>
        );
      })}
    </>
  );
}

export default ProductsDropDown;
