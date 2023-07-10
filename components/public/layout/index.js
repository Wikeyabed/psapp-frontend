import React from "react";
import Navbar from "./navbar";
import MenuBar from "./menubar";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";

function PublicLayout({ children }) {
  const loadingProgress = useSelector((state) => state.progress);
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
