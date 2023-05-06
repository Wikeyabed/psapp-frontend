import React from "react";
import Navbar from "./navbar";
import MenuBar from "./menubar";

import { Grid, Box } from "@mui/material";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <MenuBar/>
      {children}
    </>
  );
}

export default PublicLayout;
