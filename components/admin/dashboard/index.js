import React from "react";
import AdminLayout from "../layout";

import { Grid, Box } from "@mui/material";

import TopBoxes from "./TopBoxes";
import UsersChart from "./UsersChart";

function AdminDashboard() {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <TopBoxes />

          <Grid item xs={12} lg={6}>
            <UsersChart title="فروش" typeOfChart="bar" />
          </Grid>

          <Grid item xs={12} lg={6}>
            <UsersChart title="کاربران" typeOfChart="line" />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default AdminDashboard;
