import React from "react";
import AdminLayout from "../layout";

import { Grid, Box, Paper } from "@mui/material";

import TopBoxes from "./TopBoxes";
import DashboardCharts from "./DashboardCharts";

function AdminDashboard({ users }) {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <TopBoxes />
          <DashboardCharts users={users} />
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default AdminDashboard;
