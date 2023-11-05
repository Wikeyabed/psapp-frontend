import React from "react";
import { Paper, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AssignmentIcon from "@mui/icons-material/Assignment";
import UpdateIcon from "@mui/icons-material/Update";
import AddCardIcon from "@mui/icons-material/AddCard";
import Link from "../../../src/Link";
import ApartmentIcon from "@mui/icons-material/Apartment";
// Style the Paper component with Emotion's styled function
const FeatureContainer = styled(Paper)({
  height: "140px !important",
  cursor: "pointer",
  borderRadius: "10px",
  border: "1px solid #e0e0e0",
  borderBottom: "5px solid #e0e0e0",
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
      columnSpacing={{ lg: 6 }}
      sx={{
        padding: "10px",
        marginTop: "25px",
      }}
    >
      <Grid
        component={Link}
        href={"/blog/3"}
        paddingBottom={1}
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <Typography color={"primary.main"} variant="body1">
            ارسال همه روزه با تهران و شهرستان
          </Typography>
          <DeliveryDiningIcon
            sx={{
              fontSize: "75px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="lightPrimary"
          />
        </FeatureContainer>
      </Grid>
      <Grid
        component={Link}
        href={"/blog/16"}
        paddingBottom={1}
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <Typography color={"primary.main"} variant="body1">
            {" "}
            امکان عودت کالا تا 2 روز
          </Typography>

          <AssignmentIcon
            sx={{
              fontSize: "65px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="lightPrimary"
          />
        </FeatureContainer>
      </Grid>
      <Grid
        component={Link}
        href={"/blog/3"}
        paddingBottom={1}
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <Typography color={"primary.main"} variant="body1">
            {" "}
            امکان خرید حضوری
          </Typography>

          <UpdateIcon
            sx={{
              fontSize: "70px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="lightPrimary"
          />
        </FeatureContainer>
      </Grid>
      <Grid
        component={Link}
        href={"/blog/17"}
        paddingBottom={1}
        item
        xs={12}
        md={6}
        lg={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <Typography color={"primary.main"} variant="body1">
            {" "}
            درباره مجموعه اییاکس
          </Typography>

          <ApartmentIcon
            sx={{
              fontSize: "70px !important",
              position: "absolute",
              left: 15,
              bottom: 5,
            }}
            color="lightPrimary"
          />
        </FeatureContainer>
      </Grid>
    </Grid>
  );
}
export default Features;
