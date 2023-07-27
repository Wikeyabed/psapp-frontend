import React from "react";
import Navbar from "./navbar";
import MenuBar from "./menubar";
import { Grid, Box } from "@mui/material";

function PublicLayout({ children }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fafafa",
      }}
    >
      <Navbar />
      <Box
        sx={{
          p: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default PublicLayout;
