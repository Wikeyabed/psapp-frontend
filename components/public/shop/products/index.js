import { Grid, Box, Paper, Divider } from "@mui/material";
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
    >
      <Paper
        sx={{
          borderRadius: "10px",
          padding: "10px 20px 20px",
        }}
        elevation={1}
        component={Grid}
        container
      >
        <Grid item xs={12}>
          <FilterBar />
        </Grid>

        {/*  */}
        <Grid container item>
          <Grid
            sx={{
              paddingTop: "10px",
              paddingX: { xs: "20px" },
            }}
            item
            xs={12}
            lg={2.6}
          >
            <CategoryBar />
          </Grid>
          {/* <Grid
          sx={{
            paddingRight: "20px",
            paddingTop: "10px",
          }}
          lg={0.5}
        >
          <Divider orientation="vertical" variant="middle" />
        </Grid> */}
          <Grid item lg={9}>
            <ProductList />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Products;
