import React from "react";
import AdminLayout from "../layout";
import AddProductModal from "./AddProductModal";
import { Grid, Box, Typography } from "@mui/material";
import ProductsTable from "../dashboard/ProductsTable";
import AddCategotyModal from "./AddCategoryModal";
import EditProductModal from "./EditProductModal";
function ProductsList() {
  return (
    <AdminLayout>
      <Box>
        <Grid sx={{ p: 5, mx: 10, mt: 5 }}>
          <Grid container>
            <Grid item xs={12}>
              <AddProductModal />
              <EditProductModal />
              <AddCategotyModal />
              <ProductsTable />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default ProductsList;
