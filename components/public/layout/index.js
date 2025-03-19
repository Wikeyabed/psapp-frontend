import React from "react";
import Navbar from "./navbar";
import { Grid, Box } from "@mui/material";
import Footer from "./footer";
import SocialMediaBar from "./socialMedia";
import PopUp from "./popup";

function PublicLayout({ children }) {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Navbar />
      <PopUp />
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
    </Box>
  );
}

export default PublicLayout;
