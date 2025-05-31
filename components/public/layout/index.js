import React from "react";
import Navbar from "./navbar";
import { Grid, Box } from "@mui/material";
import Footer from "./footer";
import SocialMediaBar from "./socialMedia";
import PopUp from "./popup";
import SocialFixed from "./SocialFixed";

function PublicLayout({ children }) {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Navbar />
      {/* <PopUp /> */}
      <Grid
        sx={{
          overflow: "hidden",

          p: 1,
          mb: 10,
          mt: { xs: 1, md: 20 },
        }}
      >
        {children}
      </Grid>
      <Footer />
      <SocialFixed />
    </Box>
  );
}

export default PublicLayout;
