import React from "react";
import AdminLayout from "../layout";

import { Grid, Box, Paper } from "@mui/material";

import TopBoxes from "./TopBoxes";
import DashboardCharts from "./DashboardCharts";

function AdminDashboard() {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <TopBoxes />

          <DashboardCharts />
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default AdminDashboard;
