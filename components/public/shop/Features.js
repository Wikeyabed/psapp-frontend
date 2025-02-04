import React from "react";
import { Paper, Grid } from "@mui/material";
import styled from "@emotion/styled";

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

const BannerImage = styled(Image)({
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
          <BannerImage
            alt="خرید پاکت پستی"
            width={300}
            height={200}
            src={"/images/send.jpg"}
          />
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
          <BannerImage
            alt="خرید کارتن پستی"
            width={300}
            height={200}
            src={"/images/return.jpg"}
          />
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
          <BannerImage
            alt="خرید سلفون"
            width={300}
            height={200}
            src={"/images/in-person.jpg"}
          />
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
          <BannerImage
            alt="خرید حبابدار"
            width={300}
            height={200}
            src={"/images/about-us.jpg"}
          />
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
        <BannerImage
          alt="خرید چسب"
          width={400}
          height={200}
          src="/images/b-mobile.jpg"
        />
      </Grid>
    </Grid>
  );
}
export default Features;
