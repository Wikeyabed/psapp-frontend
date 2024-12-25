import React from "react";
import AdminLayout from "../layout";
import AddProductModal from "./AddProductModal";
import { Grid, Box, Typography } from "@mui/material";
import ProductsTable from "./ProductsTable";
import AddCategoryModal from "./AddCategoryModal";
import EditProductModal from "./EditProductModal";
import EditCategoryModal from "./EditCategoryModal";
function ProductsList({ products, categories }) {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <AddProductModal products={products} />
            <AddCategoryModal cats={categories} />
            <EditCategoryModal cats={categories} />
            <ProductsTable products={products} />
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default ProductsList;
