import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "../../../../src/Link";
function ProductsDropDown({ handleClose }) {
  const searchParams = useSearchParams();
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
            onClick={handleClose}
            disableRipple
            // component={Link}
          >
            <ChevronLeftIcon sx={{ ml: 1 }} />
            {category}
          </MenuItem>
        );
      })}
    </>
  );
}

export default ProductsDropDown;
