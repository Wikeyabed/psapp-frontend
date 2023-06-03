import React from "react";
import PublicLayout from "../layout";
import { Grid, Box, Paper } from "@mui/material";
import Banners from "./Banners";
import Features from "./Features";
import Products from "./products";

function Shop() {
  return (
    <PublicLayout>
      <Grid
        sx={{
          // backgroundColor: "primary.main",
          height: 200,
        }}
        container
      >
        {/* side Menu for categories ? */}
        <Grid item lg={2.5}>
          {/* <CategoryBar /> */}
        </Grid>

        {/* Main article for shop */}
        <Grid item md={8} lg={7}>
          <Banners />
          <Features />
          <Products />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default Shop;
