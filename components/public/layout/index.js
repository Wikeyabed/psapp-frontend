import React from "react";
import Navbar from "./navbar";
import { Grid, Box } from "@mui/material";
import Footer from "./footer";
import SocialMediaBar from "./socialMedia";

function PublicLayout({ children }) {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Navbar />
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
    </Box>
  );
}

export default PublicLayout;
