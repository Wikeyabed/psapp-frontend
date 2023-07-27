import React from "react";
import Navbar from "./navbar";
import MenuBar from "./menubar";
import { Grid, Box } from "@mui/material";

function PublicLayout({ children }) {
  return (
    <Box>
      <Navbar />
      <Box
        sx={{
          p: 1,
          mb: 10,
          mt: 10,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default PublicLayout;
