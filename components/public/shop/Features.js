import React from "react";
import { Paper, Grid } from "@mui/material";
import styled from "@emotion/styled";
// Style the Paper component with Emotion's styled function
const FeatureContainer = styled(Paper)({
  height: "100px !important",
  borderRadius: "10px",
  textAlign: "center",
  paddingTop: "25px",
  transition: ".3s ease all",
  // Add a hover effect to the Paper component
  "&:hover": {
    transform: "scale(1.03)",
  },
});
function Features() {
  return (
    // Use the Grid component to create a responsive grid layout
    <Grid
      container
      columnSpacing={8}
      sx={{
        padding: "10px",
      }}
    >
      <Grid padding={1} item xs={12} md={3}>
        <FeatureContainer elevation={3}>تحویل اکسپرس</FeatureContainer>
      </Grid>
      <Grid padding={1} item xs={12} md={3}>
        <FeatureContainer elevation={3}>ضمانت اصل بودن کالا</FeatureContainer>
      </Grid>
      <Grid padding={1} item xs={12} md={3}>
        <FeatureContainer elevation={3}>پشتیبانی 24 ساعته</FeatureContainer>
      </Grid>
      <Grid padding={1} item xs={12} md={3}>
        <FeatureContainer elevation={3}>امکان پرداخت در محل</FeatureContainer>
      </Grid>
    </Grid>
  );
}
export default Features;
