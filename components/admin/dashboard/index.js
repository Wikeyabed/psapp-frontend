import React from "react";
import AdminLayout from "../layout";

import { Grid, Box, Paper } from "@mui/material";

import TopBoxes from "./TopBoxes";
import DashboardCharts from "./DashboardCharts";

function AdminDashboard({ users, orders, products }) {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <TopBoxes users={users} orders={orders} products={products} />
          <DashboardCharts users={users} />
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default AdminDashboard;
