import { Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import usePagination from "../../../../src/usePagination";
// get product list from database

function ProductList() {
  const productList = useSelector((state) => state.product.products);
  const searchValue = useSelector((state) => state.product.search);
  const category = useSelector((state) => state.product.filter);
  const priceSort = useSelector((state) => state.product.priceSort);

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filteredProductList = productList
    .filter(
      (product) =>
        ((product.is_active && product.category == category) ||
          (product.is_active && category == "all")) &&
        product.product_name.includes(searchValue)
    )
    .sort((a, b) => {
      if (priceSort == "cheap") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const _DATA = usePagination(filteredProductList, PER_PAGE);
  const count = Math.ceil(filteredProductList.length / PER_PAGE);
  return (
    <Grid container>
      {filteredProductList.length > 0 ? (
        _DATA.currentData().map((product, i) => {
          return (
            <Grid
              sx={{
                p: 2,
              }}
              key={i}
              item
              xs={12}
              sm={6}
              md={4}
              xl={3}
            >
              <ProductCard
                productName={product.product_name}
                productCode={product.product_id}
                price={product.price}
                stack={product.stack}
                imageUrl={product.images_url[0]}
                discount={product.discount}
                quantity={product.quantity}
                stock={product.product_quantity}
              />
            </Grid>
          );
        })
      ) : (
        <Typography
          sx={{
            textAlign: "center !important",
            marginX: "auto",
          }}
          variant="h6"
        >
          {" "}
          موردی یافت نشد...
        </Typography>
      )}

      <Grid
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
        }}
        item
        xs={12}
      >
        <Pagination
          color="standard"
          count={count}
          size="large"
          page={page}
          shape="rounded"
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
}

export default ProductList;
