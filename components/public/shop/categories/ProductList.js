import { Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "@mui/material";
import usePagination from "../../../../src/usePagination";

// get product list from database

function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.products);
  const searchValue = useSelector((state) => state.product.search);
  const category = useSelector((state) => state.product.filter);
  const priceSort = useSelector((state) => state.product.priceSort);

  let [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filteredProductList = productList
    .filter(
      (product) =>
        (product.info.category == category || category == "all") &&
        product.info.product_name.includes(searchValue)
    )
    .sort((a, b) => {
      if (priceSort == "cheap") {
        return (
          a.variants[0].variant_price * 1 - b.variants[0].variant_price * 1
        );
      } else {
        return (
          b.variants[0].variant_price * 1 - a.variants[0].variant_price * 1
        );
      }
    });

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    _DATA.jump(1);
  }, [category]);

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
                productName={product.info.product_name}
                productCode={product.info.product_id}
                product_uuid={product.info.product_uuid}
                variant_uuid={product.variants[0].variant_uuid}
                variant_name={product.variants[0].variant_name}
                price={product.variants[0].variant_price}
                stack={product.variants[0].variant_stack}
                imageUrl={product.info.images_url}
                discount={product.variants[0].variant_discount}
                quantity={product.variants[0].variant_quantity}
                stock={product.variants[0].variant_quantity}
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
