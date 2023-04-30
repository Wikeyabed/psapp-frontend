import React from "react";
import Navbar from "./navbar";

import { Grid, Box } from "@mui/material";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default PublicLayout;
