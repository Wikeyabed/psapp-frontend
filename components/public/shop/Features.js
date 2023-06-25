import React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UpdateIcon from "@mui/icons-material/Update";
import AddCardIcon from "@mui/icons-material/AddCard";
// Style the Paper component with Emotion's styled function
const FeatureContainer = styled(Paper)({
  height: "140px !important",
  background:
    "linear-gradient(180deg, rgba(19,19,19,1) 0%, rgba(61,61,61,1) 50%, rgba(108,108,108,1) 100%)",
  borderRadius: "10px",
  textAlign: "center",
  paddingTop: "25px",
  transition: ".2s ease all",
  padding: "15px 25px",
  position: "relative",
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
      columnSpacing={{ xs: 1, lg: 6 }}
      sx={{
        padding: "10px",
        marginTop: "25px",
      }}
    >
      <Grid paddingBottom={1} item xs={6} lg={3}>
        <FeatureContainer
          sx={{
            color: "#fff",
          }}
          elevation={1}
        >
          <Typography variant="h6">تحویل اکسپرس</Typography>
          <DeliveryDiningIcon
            sx={{
              fontSize: "75px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="warning"
          />
        </FeatureContainer>
      </Grid>
      <Grid paddingBottom={1} item xs={6} lg={3}>
        <FeatureContainer
          sx={{
            color: "#fff",
          }}
          elevation={3}
        >
          <Typography variant="h6"> ضمانت اصل بودن کالا</Typography>

          <AssignmentIcon
            sx={{
              fontSize: "65px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="warning"
          />
        </FeatureContainer>
      </Grid>
      <Grid item xs={6} lg={3}>
        <FeatureContainer
          sx={{
            backgroundColor: "secondary.main",
            color: "#fff",
          }}
          elevation={3}
        >
          <Typography variant="h6"> پشتیبانی 24 ساعته</Typography>

          <UpdateIcon
            sx={{
              fontSize: "70px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="warning"
          />
        </FeatureContainer>
      </Grid>
      <Grid item xs={6} lg={3}>
        <FeatureContainer
          sx={{
            backgroundColor: "secondary.main",
            color: "#fff",
          }}
          elevation={3}
        >
          <Typography variant="h6"> امکان پرداخت در محل</Typography>

          <AddCardIcon
            sx={{
              fontSize: "70px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="warning"
          />
        </FeatureContainer>
      </Grid>
    </Grid>
  );
}
export default Features;
