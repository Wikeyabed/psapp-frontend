import React from "react";
import AdminLayout from "../layout";

import { Grid, Box, Typography } from "@mui/material";

function CommentList({ comments }) {
  return (
    <AdminLayout>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            {/* <ProductsTable products={products} /> */}
            comments
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default CommentList;
