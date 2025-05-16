import React from "react";
import PaymentStepper from "../paymentSteps";
import { Grid } from "@mui/material";
import PublicLayout from "../../layout";

function Checkout() {
  return (
    <PublicLayout>
      {" "}
      <Grid container>
        <Grid
          xs={12}
          md={8}
          sx={{
            mt: 10,
            backgroundColor: "#e2e2e2",
            borderRadius: 10,
            border: "1px solid #444",
            p: 4,
            mx: "auto",
            minHeight: 600,
          }}
        >
          <PaymentStepper />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default Checkout;
