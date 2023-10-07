import { Box, Grid, Button, Typography } from "@mui/material";
import React from "react";

function NewBlogCategory() {
  return (
    <Grid container>
      <Grid
        sx={{
          mt: 10,
        }}
        item
        xs={12}
      >
        <Typography>ایجاد دسته بندی جدید</Typography>
      </Grid>
    </Grid>
  );
}

export default NewBlogCategory;
