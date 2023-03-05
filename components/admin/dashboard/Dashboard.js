import React from "react";
import AdminLayout from "../layout";

import { Grid, Box } from "@mui/material";

import TopBoxes from "./TopBoxes";
import UsersChart from "./UsersChart";
import ProductsTable from "./ProductsTable";

function AdminDashboard() {
  return (
    <AdminLayout>
      <Box>
        <Grid sx={{ p: 5, mx: 10, mt: 5 }}>
          <Grid container>
            <TopBoxes />

            <Grid item xs={12} lg={6}>
              <UsersChart title="فروش" typeOfChart="bar" />
            </Grid>

            <Grid item xs={12} lg={6}>
              <UsersChart title="کاربران" typeOfChart="line" />
            </Grid>

            <Grid item xs={12} lg={6}>
              <ProductsTable />
            </Grid>

            <Grid item xs={12} lg={6}>
              <ProductsTable />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default AdminDashboard;
