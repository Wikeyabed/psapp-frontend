import React from "react";
import AdminLayout from "../layout/index";

import { Grid, Box, Typography } from "@mui/material";

import ProductsTable from "../dashboard/ProductsTable";

function UsersTable() {
  return (
    <AdminLayout>
      <Box>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Hello
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ProductsTable />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default UsersTable;
