// Import necessary dependencies
import React from "react";
import { Grid } from "@mui/material";
// Import components
import PublicLayout from "../layout";
import Banners from "./Banners";
import Features from "./Features";
import Products from "./products";
// Define Shop component
function Shop() {
  return (
    <PublicLayout>
      <Grid container sx={{ height: "100%" }}>
        {/* Side menu for categories */}
        <Grid item xs={12} md={2.5}>
          {/* <CategoryBar /> */}
        </Grid>
        {/* Main article for shop */}
        <Grid item xs={12} md={8} lg={7}>
          {/* Display banners */}
          <Banners />
          {/* Display features */}
          <Features />
          {/* Display products */}
          <Products />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
// Export Shop component
export default Shop;
