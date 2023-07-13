import { Grid } from "@mui/material";

import React from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

// get product list from database

function ProductList() {
  const productList = useSelector((state) => state.product.filteredProducts);
  const searchValue = useSelector((state) => state.product.search);
  const category = useSelector((state) => state.product.filter);

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
      {productList
        .filter(
          (product) =>
            (product.category == category || category == "all") &&
            product.product_name.includes(searchValue)
        )
        .map((product, i) => (
          <Grid key={i} item xs={12} sm={6} lg={4}>
            <ProductCard
              productName={product.product_name}
              productCode={product.product_id}
              price={product.price}
              quantity={product.quantity}
              imageUrl={product.images_url[product.images_url.length - 1]}
            />
          </Grid>
        ))}
    </Grid>
  );
}

export default ProductList;
