import React from "react";
import AdminLayout from "../layout/index";

import { Grid, Box, Typography } from "@mui/material";

import ProductsTable from "../dashboard/ProductsTable";

function UsersTable() {
  return (
    <AdminLayout>
      <Box>
        <Grid sx={{ p: 5, mx: 10, mt: 5 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography>Hello</Typography>
              <ProductsTable />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default UsersTable;
