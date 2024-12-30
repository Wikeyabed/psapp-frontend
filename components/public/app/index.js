import { Grid } from "@mui/material";
import React from "react";
import PublicLayout from "../layout";
import InstallApp from "../layout/navbar/InstallApp";

function InstallAppContainer() {
  return (
    <PublicLayout>
      <Grid container>
        <Grid
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 20,
          }}
          item
        >
          <InstallApp />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default InstallAppContainer;
