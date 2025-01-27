import { Grid, Paper, Box, Typography } from "@mui/material";
import PublicLayout from "../../layout/index";
import FilterBar from "./FilterBar";
import ProductList from "./ProductList";

function Categories({ cats }) {
  return (
    <PublicLayout>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
        container
        spacing={3}
      >
        <Grid xs={12} md={10} lg={8} sx={{ maxWidth: 1024, p: 2 }} item>
          <Typography
            component="div"
            sx={{
              my: 10,

              width: "100% !important",
              fontWeight: "bold",
              textDecoration: "underline",
              textDecorationColor: "#007aff",
              textDecorationThickness: "4px",
              textUnderlineOffset: 12,
              textAlign: "center",
            }}
            variant="h5"
            gutterBottom
          >
            تمامی محصولات
          </Typography>
          <FilterBar />
          <ProductList cats={cats} />
        </Grid>
      </Grid>
    </PublicLayout>
  );
}

export default Categories;
