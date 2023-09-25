import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "../../../../src/Link";
function ProductsDropDown() {
  const [anchorProduct, setAnchorProduct] = useState(null);

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

  const handleCloseProduct = () => {
    setAnchorProduct(null);
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
            onClick={handleCloseProduct}
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
