import React from "react";
import PublicLayout from "../layout";
import { Grid, Paper, Typography } from "@mui/material";

function UserOrderPage({ order }) {
  console.log("order", order);
  return (
    <PublicLayout>
      <Grid container display={"flex"} justifyContent={"center"}>
        <Grid
          sx={{
            p: 4,
          }}
          component={Paper}
          item
          xs={12}
          md={8}
          lg={6}
        >
          <Typography variant="h6" textAlign={"center"}>
            شماره فاکتور : {order.order_number}
          </Typography>
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default UserOrderPage;
