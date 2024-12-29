import React from "react";
import { Paper, Grid, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import HailIcon from "@mui/icons-material/Hail";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import SendBanner from "../../../public/images/send.jpg";
import InPersonBanner from "../../../public/images/in-person.jpg";
import ReturnBanner from "../../../public/images/return.jpg";
import AboutUsBanner from "../../../public/images/about-us.jpg";

import Link from "../../../src/Link";
import Image from "next/image";
// Style the Paper component with Emotion's styled function
const FeatureContainer = styled(Paper)({
  height: "140px !important",
  cursor: "pointer",
  borderRadius: "20px",
  border: "1px solid #ccc",
  borderBottom: "5px solid #ccc",
  boxShadow: "0px 0px 10px 0px #ccc",
  textAlign: "center",
  transition: ".2s ease all",
  position: "relative",

  // Add a hover effect to the Paper component
  "&:hover": {
    transform: "scale(1.03)",
  },
});

const BannerImage = styled("img")({
  display: { xs: "none !important", md: "block" },
  width: "100%",
  height: "100%",
  // objectFit: "fill",
  borderRadius: "9px",
});

function Features() {
  return (
    // Use the Grid component to create a responsive grid layout
    <Grid
      spacing={4}
      container
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
        xs={6}
        sm={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <BannerImage src={"/images/send.jpg"} />
        </FeatureContainer>
      </Grid>
      <Grid
        component={Link}
        href={"/blog/16"}
        paddingBottom={1}
        item
        xs={6}
        sm={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <BannerImage src={"/images/return.jpg"} />
        </FeatureContainer>
      </Grid>
      <Grid
        component={Link}
        href={"/blog/3"}
        paddingBottom={1}
        item
        xs={6}
        sm={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <BannerImage src={"/images/in-person.jpg"} />
        </FeatureContainer>
      </Grid>
      <Grid
        component={Link}
        href={"/blog/17"}
        paddingBottom={1}
        item
        xs={6}
        sm={3}
        sx={{
          textDecoration: "none !important",
        }}
      >
        <FeatureContainer elevation={1}>
          <BannerImage src={"/images/about-us.jpg"} />
        </FeatureContainer>
      </Grid>
      <Grid
        item
        component={Link}
        href="/shop/categories?category=بازار+عمده+فروشی"
        sx={{
          textAlign: "center",
          width: "100%",
          display: { xs: "block", md: "none" },
        }}
        xs={12}
      >
        <BannerImage src="/images/b-mobile.jpg" />
      </Grid>
    </Grid>
  );
}
export default Features;
