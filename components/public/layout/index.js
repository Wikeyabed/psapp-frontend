import React from "react";
import Navbar from "./navbar";
import { Grid, Box } from "@mui/material";
import Footer from "./footer";

function PublicLayout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          p: 1,
          mb: 10,
          mt: 20,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default PublicLayout;
