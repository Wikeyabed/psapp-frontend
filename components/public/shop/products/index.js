import { Grid, Box, Paper, Divider } from "@mui/material";
import styled from "@emotion/styled";
import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";
import ProductListByCategory from "./ProductListByCategory";
function Products() {
  return (
    <Grid
      id="product_list"
      sx={{
        padding: "10px",
        marginTop: "75px",
      }}
    >
      <Grid
        sx={{
          borderRadius: "10px",
          padding: "10px 20px 20px",
          // minHeight: { md: "600px" },
        }}
        elevation={2}
        container
      >
        {/* <Grid
          sx={{
            display: { xs: "none", md: "flex" },
          }}
          item
          xs={12}
        > */}
        {/* <FilterBar /> */}
        {/* </Grid> */}
        <ProductListByCategory />
        {/* <ProductList /> */}
      </Grid>
    </Grid>
  );
}

export default Products;
