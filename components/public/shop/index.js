// Import necessary dependencies
import React from "react";
import { Box, Grid } from "@mui/material";
// Import components
import PublicLayout from "../layout";
import Banners from "./Banners";
import Features from "./Features";
import Products from "./products";
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
          <Banners />
          {/* Display features */}

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            {" "}
            <Features />
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
