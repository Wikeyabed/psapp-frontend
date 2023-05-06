import React from "react";
import PublicLayout from "../layout";
import { Grid, Box, Paper } from "@mui/material";
import Banners from "./Banners";
import CategoryBar from "./CategoryBar";
import Features from "./Features";

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
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default Shop;
