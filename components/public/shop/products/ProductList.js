import { Grid, Box, Paper } from "@mui/material";

import styled from "@emotion/styled";
import React from "react";
import ProductCard from "./ProductCard";

const ProductWrapper = styled(Grid)({
  padding: "10px",
});

const ProductPaper = styled(Paper)({
  minHeight: "200px",
});

const mapper = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// get product list from database

function ProductList() {
  return (
    <Grid
      columnSpacing={2}
      rowSpacing={2}
      container
      sx={{
        padding: "10px",
      }}
    >
      {mapper.map((i) => {
        return (
          <ProductWrapper key={i} item lg={4}>
            <ProductCard />
          </ProductWrapper>
        );
      })}
    </Grid>
  );
}

export default ProductList;
