import { Grid, Typography } from "@mui/material";

import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

// get product list from database

function ProductList() {
  const productList = useSelector((state) => state.product.products);
  const searchValue = useSelector((state) => state.product.search);
  const category = useSelector((state) => state.product.filter);
  const priceSort = useSelector((state) => state.product.priceSort);

  const filteredProductList = productList
    .filter(
      (product) =>
        (product.category == category || category == "all") &&
        product.product_name.includes(searchValue)
    )
    .sort((a, b) => {
      if (priceSort == "cheap") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return (
    <Grid
      columnSpacing={3}
      rowSpacing={3}
      container
      sx={{
        paddingX: "20px",
        paddingY: "10px",
        textAlign: "center !important",
      }}
    >
      {filteredProductList.length > 0 ? (
        filteredProductList.map((product, i) => {
          return (
            <Grid key={i} item xs={12} lg={4}>
              <ProductCard
                productName={product.product_name}
                productCode={product.product_id}
                price={product.price}
                quantity={product.quantity}
                imageUrl={product.images_url[product.images_url.length - 1]}
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
    </Grid>
  );
}

export default ProductList;
