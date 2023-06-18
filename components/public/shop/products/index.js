import { Grid, Box, Paper } from "@mui/material";
import styled from "@emotion/styled";
import CategoryBar from "./CategoryBar";
import ProductList from "./ProductList";
import FilterBar from "./FilterBar";
function Products() {
  return (
    <Grid
      sx={{
        padding: "10px",
        marginTop: "75px",
      }}
      container
    >
      <Grid item xs={12}>
        <FilterBar />
      </Grid>

      <Grid item lg={3}>
        <CategoryBar />
      </Grid>
      <Grid item lg={9}>
        <ProductList />
      </Grid>
    </Grid>
  );
}

export default Products;
