// Import necessary dependencies
import React from "react";
import { Box, Grid } from "@mui/material";
// Import components
import PublicLayout from "../layout";
import Banners from "./Banners";
import Features from "./Features";
import Products from "./products";
import ShopSlider from "./Slider";
import LatestBlog from "./miniBlog";
// Define Shop component
function Shop() {
  return (
    <PublicLayout>
      <Grid
        container
        sx={{ height: "100%", display: "flex", justifyContent: "center" }}
      >
        {/* Side menu for categories */}
        {/* <Grid item xs={12} md={1.5} xl={2.5}> */}
        {/* <CategoryBar /> */}
        {/* </Grid> */}
        {/* Main article for shop */}
        <Grid
          item
          sx={{
            width: { xs: "100% !important ", md: "1024px !important" },
          }}
        >
          {/* Display banners */}

          <ShopSlider />
          {/* Display features */}

          <Box
            sx={{
              display: "flex",
            }}
          >
            {" "}
            <Features />
          </Box>
          <Box>
            <LatestBlog />
          </Box>

          {/* Display products */}

          <Products />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}
// Export Shop component
export default Shop;
