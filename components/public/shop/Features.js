import React from "react";
import { Paper, Grid } from "@mui/material";
import styled from "@emotion/styled";

const FeatureContainer = styled(Paper)({
  //   backgroundColor: "red",
  height: "100px !important",
  transition: ".3s ease all",
  "&:hover": {
    transform: "scale(1.03)",
  },
});
function Features() {
  return (
    <Grid
      columnSpacing={8}
      container
      sx={{
        padding: "10px",
      }}
      //   spacing={1}
    >
      <Grid md={3} item>
        <FeatureContainer elevation={3}>1</FeatureContainer>
      </Grid>
      <Grid md={3} item>
        <FeatureContainer elevation={3}>1</FeatureContainer>
      </Grid>
      <Grid md={3} item>
        <FeatureContainer elevation={3}>1</FeatureContainer>
      </Grid>
      <Grid md={3} item>
        <FeatureContainer elevation={3}>1</FeatureContainer>
      </Grid>
    </Grid>
  );
}

export default Features;
