import { Paper, Grid } from "@mui/material";
import React from "react";

function ShopSwiperCards({ children }) {
  return (
    <Grid
      sx={{
        height: 300,
        borderRadius: 2,
        backgroundColor: "#fff",
        boxShadow: "-1px 1px 0px 1px #ccc",
      }}
      elevation={1}
    >
      {children}
    </Grid>
  );
}

export default ShopSwiperCards;
