import React from "react";
import PublicLayout from "../layout";
import { Grid , Box , Paper  } from "@mui/material";

function Shop() {
  return <PublicLayout>
    

    <Grid sx={{
      backgroundColor : "primary.main",
      height :200
    }} container>



{/* side Menu for categories ? */}
  <Grid sx={{
        backgroundColor:"blue"
      }} item lg={2}>

      </Grid>



{/* Main article for shop */}
      <Grid sx={{
        backgroundColor:"red"
      }} item lg={8}>

      </Grid>

    </Grid>
  </PublicLayout>;
}

export default Shop;
