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
      {/* <MenuBar/> */}
      {children}
    </Box>
  );
}

export default PublicLayout;
