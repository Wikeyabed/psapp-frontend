import { Grid } from "@mui/material";

import styled from "@emotion/styled";
import React from "react";
import ProductCard from "./ProductCard";

const ProductWrapper = styled(Grid)({});

const mapper = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// get product list from database

function ProductList() {
  return (
    <Grid
      columnSpacing={2}
      rowSpacing={2}
      container
      sx={{
        paddingX: "20px",
        paddingY: "10px",
        textAlign: "center !important",
      }}
    >
      {mapper.map((i) => {
        return (
          <ProductWrapper key={i} item xs={12} sm={6} lg={4}>
            <ProductCard />
          </ProductWrapper>
        );
      })}
    </Grid>
  );
}

export default ProductList;
