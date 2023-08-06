import React from "react";
import AdminLayout from "../layout";
import AddProductModal from "./AddProductModal";
import { Grid, Box, Typography } from "@mui/material";
import ProductsTable from "./ProductsTable";
import AddCategotyModal from "./AddCategoryModal";
import EditProductModal from "./EditProductModal";
function ProductsList({ products }) {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <AddProductModal />
            <AddCategotyModal />
            <ProductsTable
              //  update={handleListUpdate}
              products={products}
            />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default ProductsList;
